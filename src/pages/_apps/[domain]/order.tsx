import React from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import prisma from "@/lib/infra/prisma/client"
import OrderItemsSummary from "@/modules/app/components/order/OrderItemsSummary"
import SectionTitle from "@/components/SectionTitle"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import StripeSeparator from "@/components/StripeSeparator"

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

const Order = () => {
  const router = useRouter()

  const { state } = useAppContext()
  const { address } = state
  const {
    user,
    address: {
      location: { tax },
    },
    order: { paymentMethod },
  } = state

  const getConfirmHandler = () => {
    if (!tax) {
      return () => router.push("/edit-address?redirect=/order")
    }

    if (!paymentMethod.name) {
      return () => router.push("/payment")
    }

    if (!user.name) {
      return () => router.push("/edit-user")
    }

    return () => router.push("/order-confirm")
  }

  const getButtonLabel = () => {
    if (!tax) {
      return "Adicionar endereço"
    }

    if (!paymentMethod.name) {
      return "Forma de pagamento"
    }

    if (!user.name) {
      return "Informações de contato"
    }

    return "Confirmar pedido"
  }

  return (
    <AppLayout
      hideCartButton
      title="Pedido"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Box
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
      >
        <OrderItemsSummary />
      </Box>
      <Box p={4} pl={{ base: 4, lg: 0 }} pr={{ base: 4, lg: 0 }}>
        <Button
          mb={4}
          width="full"
          colorScheme="brand"
          onClick={getConfirmHandler()}
        >
          {getButtonLabel()}
        </Button>
      </Box>
    </AppLayout>
  )
}

export default Order
