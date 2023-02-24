import React, { useState } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"

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
  return {
    props: {
      domain: params.domain,
    },
  }
}

const OrderConfirm = () => {
  const router = useRouter()

  const { state } = useAppContext()
  const { address } = state
  const {
    address: {
      location: { tax },
    },
    order: { paymentMethod },
  } = state

  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false)

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
      >
        <SectionTitle>Entrega</SectionTitle>
        <Flex p={4} gap={4} direction="column">
          <Box position="relative">
            <Flex
              as="button"
              color="gray.500"
              shadow="md"
              width="22px"
              height="22px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top={0}
              right={0}
              onClick={() =>
                router.push("/edit-address?redirect=order-confirm")
              }
            >
              <BiEdit />
            </Flex>
            <Heading size="xs" mb={2} fontWeight="500">
              Endereço
            </Heading>
            {address.street}, {address.number}, {address.location.neighborhood}
          </Box>
          <StripeSeparator vertical />
          <Box>
            <Heading size="xs" mb={2} fontWeight="500">
              Taxa
            </Heading>
            <Box as="span" fontWeight="500" color="brand.500">
              {formatToRealCurrency(Number(tax))}
            </Box>
          </Box>
          <StripeSeparator vertical />
          <Box>
            <Heading size="xs" mb={2} fontWeight="500">
              Tempo estimado
            </Heading>
            {address.location.estimatedTime} min.
          </Box>
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
        onConfirm={() => alert("confirm")}
      />
    </AppLayout>
  )
}

export default OrderConfirm
