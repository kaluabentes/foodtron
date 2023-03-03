import React, { useState } from "react"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import BarIconButton from "@/components/BarIconButton"
import { BiEdit, BiLeftArrowAlt } from "react-icons/bi"
import prisma from "@/lib/infra/prisma/client"
import OrderItemsSummary from "@/modules/app/components/order/OrderItemsSummary"
import SectionTitle from "@/components/SectionTitle"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import StripeSeparator from "@/components/StripeSeparator"
import OrderOptionsModal from "@/modules/app/components/order/OrderOptionsModal"
import OrderConfirmModal from "@/modules/app/components/order/OrderConfirmModal"
import EditableDataItem from "@/components/EditableDataItem"
import useCreateOrder from "@/modules/orders/hooks/useCreateOrder"
import useBottomToast from "@/lib/hooks/useBottomToast"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store) => ({
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

const OrderConfirm = ({ storeId }: OrderConfirmProps) => {
  const router = useRouter()
  const toast = useBottomToast()

  const { state } = useAppContext()
  const { address } = state
  const {
    user,
    address: {
      location: { tax },
    },
    order: { paymentMethod, products },
  } = state
  const assembledAddress = `${address.street}, ${address.number}, ${address.location.neighborhood}`

  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false)
  const { createOrder, isCreating } = useCreateOrder()

  const handleOrderConfirm = () => {
    if (!address.location.neighborhood || !address.street || !address.number) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Complete os dados de entrega",
        status: "error",
      })
      return
    }

    if (!paymentMethod.name) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Complete os dados de pagamento",
        status: "error",
      })
      return
    }

    if (!user.name) {
      setIsOrderConfirmModalOpen(false)
      toast({
        title: "Atenção",
        description: "Complete os dados de contato",
        status: "error",
      })
      return
    }

    createOrder({
      tax,
      paymentMethod: paymentMethod.name,
      change: paymentMethod.change,
      address: assembledAddress,
      storeId,
      username: user.name,
      phone: user.phone,
      orderProducts: products,
    })
  }

  return (
    <AppLayout
      title="Confirmar pedido"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/payment")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        mb={4}
        shadow="sm"
      >
        <SectionTitle>Pedido</SectionTitle>
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
        <Flex p={4} gap={4} direction="column">
          <EditableDataItem
            field="Tipo"
            value={paymentMethod.name}
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
        <Flex p={4} gap={4} direction="column">
          <EditableDataItem
            field="Endereço"
            value={assembledAddress}
            onEdit={() => router.push("/edit-address?redirect=/order-confirm")}
          />
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Taxa"
            value={formatToRealCurrency(Number(tax))}
          />
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Tempo estimado"
            value={`${address.location.estimatedTime} min.`}
          />
        </Flex>
      </Box>
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
      >
        <SectionTitle>Contato</SectionTitle>
        <Flex p={4} gap={4} direction="column">
          <EditableDataItem
            field="Nome"
            value={user.name}
            onEdit={() => router.push("/edit-user?redirect=/order-confirm")}
          />
          <StripeSeparator horizontal />
          <EditableDataItem field="Phone" value={user.phone} />
        </Flex>
      </Box>
      <Box p={4} pl={{ base: 4, lg: 0 }} pr={{ base: 4, lg: 0 }}>
        <Button
          width="full"
          colorScheme="brand"
          onClick={() => {
            setIsOrderConfirmModalOpen(true)
          }}
        >
          Confirmar
        </Button>
      </Box>
      <OrderConfirmModal
        onClose={() => setIsOrderConfirmModalOpen(false)}
        address={address}
        isOpen={isOrderConfirmModalOpen}
        onConfirm={handleOrderConfirm}
      />
    </AppLayout>
  )
}

export default OrderConfirm
