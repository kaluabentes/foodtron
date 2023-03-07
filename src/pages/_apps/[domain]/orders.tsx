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
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { useSession } from "next-auth/react"
import EmptyState from "@/components/EmptyState"

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
  const { data: session } = useSession()

  const [orderToShow, setOrderToShow] = useState<Order | undefined>()

  const renderOrders = () => {
    if (!app.user.orders.length) {
      return <EmptyState message="Não há pedidos ainda" />
    }

    return app.user.orders.map((order) => (
      <OrderCard
        onClick={() => setOrderToShow(order)}
        onTrack={() => router.push(`/track-order?id=${order.id}`)}
        order={order}
      />
    ))
  }

  return (
    <AppLayout title="Pedidos">
      {!session && <UserAccountWarning />}
      <Flex
        direction="column"
        gap={4}
        borderRadius="md"
        overflow="hidden"
        shadow="sm"
        p={{ base: 4, md: 0 }}
        pt={{ base: 0 }}
      >
        {renderOrders()}
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
