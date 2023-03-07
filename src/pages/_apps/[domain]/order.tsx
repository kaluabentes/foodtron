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
import ResponsiveButton from "@/components/ResponsiveButton"

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
        mt={{ base: 0, md: 4 }}
        background="white"
        overflow="hidden"
        borderRadius={{ base: undefined, lg: "md" }}
        shadow="sm"
      >
        <OrderItemsSummary />
      </Box>
      <ResponsiveButton onClick={() => router.push("/order-confirm")}>
        Confirmar
      </ResponsiveButton>
    </AppLayout>
  )
}

export default Order
