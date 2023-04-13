import React, { useEffect, useState } from "react"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import prisma from "@/lib/providers/prisma/client"
import OrderItemsSummary from "@/modules/app/components/order/OrderItemsSummary"
import SectionTitle from "@/components/SectionTitle"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import StripeSeparator from "@/components/StripeSeparator"
import OrderConfirmModal from "@/modules/app/components/order/OrderConfirmModal"
import EditableDataItem from "@/components/EditableDataItem"
import useCreateOrder from "@/modules/admin/orders/hooks/useCreateOrder"
import useBottomToast from "@/lib/hooks/useBottomToast"
import ResponsiveButton from "@/components/ResponsiveButton"
import useCurrentAddress from "@/modules/app/addresses/hooks/useCurrentAddress"
import formatAddress from "@/modules/app/addresses/lib/formatAddress"
import sumOrderSubtotal from "@/modules/admin/orders/lib/sumOrderSubtotal"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store: any) => ({
      params: {
        domain: store.subdomain,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const store = await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
  })

  return {
    props: {
      storeId: store?.id,
    },
  }
}

interface OrderConfirmProps {
  storeId: string
}

let toastTimeout = setTimeout(() => {}, 3000)

const OrderConfirm = ({ storeId }: OrderConfirmProps) => {
  const router = useRouter()
  const toast = useBottomToast()

  const { state, setState, mutateState } = useAppContext()

  const {
    user,
    order: { paymentMethod, products },
    isReady,
    store: { minimumOrderPrice },
  } = state
  const { selectedAddressId } = user

  const address = useCurrentAddress()
  const assembledAddress = address ? formatAddress(address!) : "---"

  const { createOrder, isCreating } = useCreateOrder()

  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false)
  const [isSendingOrder, setIsSendingOrder] = useState(false)

  const verifyInformations = () => {
    if (sumOrderSubtotal(products) < Number(minimumOrderPrice)) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description:
          "Você precisa alcançar o pedido mínimo, sem contar com a taxa de entrega",
        status: "error",
      })
      return false
    }

    if (!paymentMethod.name) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Adicione os dados de pagamento",
        status: "error",
      })
      return false
    }

    if (!selectedAddressId) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Adicione os dados de entrega",
        status: "error",
      })
      return false
    }

    if (!user.name) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Adicione os dados de usuário",
        status: "error",
      })
      return false
    }

    return true
  }

  const handleOrderConfirm = async () => {
    const order = await createOrder({
      tax: address?.location?.tax,
      paymentMethod: paymentMethod.name,
      change: paymentMethod.change,
      address: assembledAddress,
      latitude: address.latitude,
      longitude: address.longitude,
      storeId,
      userId: user.id,
      username: user.name,
      phone: user.phone,
      estimatedTime: address?.location?.estimatedTime,
      orderProducts: products,
    })
    setIsOrderConfirmModalOpen(false)
    setIsSendingOrder(true)
    mutateState({
      ...state,
      order: {
        ...state.order,
        products: [],
      },
      user: {
        ...state.user,
        orders: [...state.user.orders, order],
      },
    })
    router.push(`/track-order?id=${order.id}`)
    toast({
      title: "Feito!",
      description: "Seu pedido foi enviado com sucesso",
      status: "success",
    })
  }

  useEffect(() => {
    if (!products.length && !isSendingOrder && isReady) {
      // Certifica de que somente no ultimo render o toast será mostrado.
      clearTimeout(toastTimeout)
      toastTimeout = setTimeout(() => {
        toast({
          title: "Atenção",
          description: "Adicione produtos",
          status: "error",
        })
      }, 600)

      router.push("/")
    }
  }, [products, isReady, isSendingOrder])

  return (
    <AppLayout
      hideCartButton
      title="Confirmar pedido"
      leftIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Box
        mt={{ base: 0, md: 4 }}
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        mb={4}
        shadow="sm"
      >
        <SectionTitle>Carrinho</SectionTitle>
        <OrderItemsSummary />
      </Box>
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
        mb={4}
      >
        <SectionTitle>Pagamento</SectionTitle>
        <Flex p={{ base: 4, md: 6 }} gap={4} direction="column">
          <EditableDataItem
            field="Tipo"
            value={paymentMethod.name || "---"}
            onEdit={() => router.push("/payment?redirect=/order-confirm")}
          />
          {paymentMethod.name === "Dinheiro" ? (
            <>
              <StripeSeparator horizontal />
              <EditableDataItem
                field="Troco pra quanto?"
                value={formatToRealCurrency(Number(paymentMethod.change))}
              />
            </>
          ) : null}
        </Flex>
      </Box>
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
        mb={4}
      >
        <SectionTitle>Entrega</SectionTitle>
        <Flex p={{ base: 4, md: 6 }} gap={4} direction="column">
          <EditableDataItem
            field="Endereço"
            value={assembledAddress}
            onEdit={() => router.push("/addresses")}
          />
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Taxa"
            value={
              address
                ? formatToRealCurrency(Number(address?.location?.estimatedTime))
                : "---"
            }
          />
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Tempo estimado"
            value={address ? `${address?.location?.estimatedTime} min.` : "---"}
          />
        </Flex>
      </Box>
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
      >
        <SectionTitle>Dados de usuário</SectionTitle>
        <Flex p={{ base: 4, md: 6 }} gap={4} direction="column">
          <EditableDataItem
            field="Nome"
            value={user.name ? user.name : "---"}
            onEdit={() => router.push("/profile?redirect=/order-confirm")}
          />
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Telefone"
            value={user.phone ? user.phone : "---"}
          />
        </Flex>
      </Box>
      <Flex
        gap={4}
        mt={{ base: 0, md: 4 }}
        p={{ base: 4, md: 0 }}
        direction={{ base: "column", md: "row" }}
      >
        <Button
          colorScheme="brand"
          type="button"
          onClick={() => {
            if (!verifyInformations()) {
              return
            }

            setIsOrderConfirmModalOpen(true)
          }}
        >
          Confirmar
        </Button>
      </Flex>
      <OrderConfirmModal
        onClose={() => setIsOrderConfirmModalOpen(false)}
        address={assembledAddress}
        isOpen={isOrderConfirmModalOpen}
        isLoading={isCreating}
        onConfirm={handleOrderConfirm}
      />
    </AppLayout>
  )
}

export default OrderConfirm
