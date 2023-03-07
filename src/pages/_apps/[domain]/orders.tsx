import { useAppContext } from "@/contexts/app"
import AppLayout from "@/layouts/AppLayout"
import auth from "@/middlewares/auth"
import OrderCard from "@/modules/app/components/order/OrderCard"
import Order from "@/modules/orders/types/Order"
import { ROLE } from "@/modules/users/constants"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import prisma from "@/lib/infra/prisma/client"
import StripeSeparator from "@/components/StripeSeparator"
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal"
import { useState } from "react"
import { useRouter } from "next/router"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store: any) => ({
      params: {
        domain: store.subdomain,
        orderId: store.id,
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
      store,
    },
  }
}

const Orders = () => {
  const router = useRouter()

  const { state: app } = useAppContext()

  const [orderToShow, setOrderToShow] = useState<Order | undefined>()

  return (
    <AppLayout title="Pedidos">
      <Flex
        direction="column"
        gap={4}
        p={{ base: 4, md: 0 }}
        pt={{ base: 4, md: 4, lg: 0 }}
        pb={{ base: 4, md: 4, lg: 4 }}
      >
        {!app.user.email && (
          <>
            <Alert fontWeight="500" fontSize="xs" borderRadius="md" shadow="sm">
              <AlertIcon />
              Você ainda não possui uma conta criada, portanto, suas informações
              estão armazenadas localmente, para salvar as suas informações na
              nuvem crie uma conta abaixo
            </Alert>
            <Button variant="outline" width="full">
              Criar conta
            </Button>
          </>
        )}
      </Flex>
      <Flex
        direction="column"
        gap={4}
        borderRadius="md"
        overflow="hidden"
        shadow="sm"
        p={{ base: 4, md: 0 }}
        pt={{ base: 0 }}
      >
        {app.user.orders.map((order) => (
          <OrderCard
            onClick={() => setOrderToShow(order)}
            onTrack={() => router.push(`/track-order?id=${order.id}`)}
            order={order}
          />
        ))}
      </Flex>
      {orderToShow && (
        <OrderDetailsModal
          actions={
            <Button
              width="full"
              onClick={() => {
                setOrderToShow(undefined)
                router.push(`/track-order?id=${orderToShow.id}`)
              }}
            >
              Acompanhar
            </Button>
          }
          isOpen={Boolean(orderToShow)}
          order={orderToShow}
          onClose={() => setOrderToShow(undefined)}
        />
      )}
    </AppLayout>
  )
}

export default Orders
