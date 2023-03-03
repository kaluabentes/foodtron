import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { configureAbly, useChannel } from "@ably-labs/react-hooks"

import PageHeader from "@/components/PageHeader"
import AdminLayout from "@/layouts/AdminLayout"
import auth from "@/middlewares/auth"
import useGetOrders from "@/modules/orders/hooks/useGetOrders"
import Order from "@/modules/orders/types/Order"
import range from "@/lib/helpers/array/range"
import { ORDER_STATUS } from "@/modules/orders/constants"
import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import StripeSeparator from "@/components/StripeSeparator"
import EmptyState from "@/components/EmptyState"
import { useEffect, useState } from "react"
import Store from "@/modules/stores/types/Store"
import useBottomToast from "@/lib/hooks/useBottomToast"
import OrderCard from "@/modules/orders/components/OrderCard"
import EditableDataItem from "@/components/EditableDataItem"
import SectionTitle from "@/components/SectionTitle"
import OrderProductItem from "@/modules/app/components/order/OrderProductItem"
import sumProductTotal from "@/modules/orders/lib/sumProductTotal"
import BaseOrderItem from "@/modules/app/components/order/BaseOrderItem"
import sumOrderSubtotal from "@/modules/orders/lib/sumOrderSubtotal"
import OrderDetails from "@/modules/orders/components/OrderDetails"
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return auth(context, ["admin"])
}

interface User {
  store: Store
}

interface OrdersProps {
  user: User
}

configureAbly(process.env.NEXT_PUBLIC_ABLY_SUBSCRIBE_KEY!)

const Orders = ({ user }: OrdersProps) => {
  const toast = useBottomToast()

  const { orders, getOrders } = useGetOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()

  const getFilteredOrders = (orders: Order[] = [], status: string) =>
    orders.filter((order: Order) => order.status === status)

  const pendingOrders = getFilteredOrders(orders, "pending")

  const playNotificationSound = async () => {
    const audio = new Audio("/notification.mp3")
    await audio.play()
  }

  useChannel(user.store.subdomain!, async () => {
    await getOrders()
    await playNotificationSound()
    toast({
      title: "Oba!",
      description: "Você recebeu um novo pedido",
      status: "info",
    })
  })

  const renderSkeleton = () =>
    range(3).map((number) => (
      <Box
        key={number}
        borderBottom="1px solid transparent"
        borderColor="gray.100"
        p={4}
        pl={0}
        pr={0}
      >
        <Skeleton h={2} mb={2} w={20} />
        <Skeleton h={2} mb={2} w="50%" />
        <Skeleton h={2} />
      </Box>
    ))

  const renderOrders = (status = "pending") => {
    if (!orders) {
      return renderSkeleton()
    }

    const filteredOrders = getFilteredOrders(orders, status)

    if (!filteredOrders.length) {
      return (
        <Box mt={4}>
          <EmptyState isGray message="Não há pedidos no momento" />
        </Box>
      )
    }

    return filteredOrders
      .reverse()
      .map((order: Order) => (
        <OrderCard
          onClick={() => setSelectedOrder(order)}
          order={order}
          isActive={selectedOrder! && selectedOrder.id === order.id}
        />
      ))
  }

  const renderOrderDetailsModal = useBreakpointValue({
    base: selectedOrder ? (
      <OrderDetailsModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(undefined)}
      />
    ) : null,
    lg: null,
  })

  const renderOrderDetails = useBreakpointValue({
    base: null,
    lg: selectedOrder ? (
      <Box width="100%" height="100vh" overflow="auto" p={4}>
        <Box
          margin="40px auto"
          width="100%"
          maxWidth="container.md"
          display="flex"
          flexDirection="column"
          borderRadius="md"
          overflow="hidden"
          shadow="sm"
        >
          <OrderDetails order={selectedOrder} />
        </Box>
      </Box>
    ) : (
      <Box
        margin="40px auto"
        width="100%"
        maxWidth="container.md"
        background="white"
        shadow="sm"
        borderRadius="md"
      >
        <EmptyState message="Nenhum pedido selecionado" />
      </Box>
    ),
  })

  return (
    <AdminLayout isFullWidth hasPadding={false}>
      <Flex alignItems="start">
        <Box
          background="white"
          borderRadius="md"
          shadow="md"
          height="100vh"
          maxWidth={{ base: undefined, lg: "400px" }}
          width="100%"
          overflowY="auto"
        >
          <Box
            p={4}
            pt={0}
            pb={0}
            borderBottom="1px solid transparent"
            borderColor="gray.200"
          >
            <PageHeader title="Pedidos" />
          </Box>
          <Tabs colorScheme="brand">
            <TabList
              overflowX={{ base: "auto", md: "initial" }}
              overflowY={{ base: "hidden", md: "initial" }}
              borderBottomWidth="1px"
            >
              <Tab flex={1} fontWeight="500" fontSize="sm">
                Aguardando{" "}
                {pendingOrders.length && (
                  <Badge
                    colorScheme="brand"
                    variant="solid"
                    borderRadius="md"
                    ml={2}
                  >
                    {pendingOrders.length}
                  </Badge>
                )}
              </Tab>
              <Tab flex={1} fontWeight="500" fontSize="sm">
                Fazendo
              </Tab>
              <Tab flex={1} fontWeight="500" fontSize="sm">
                Entrega
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel pt={0} pb={0} overflow="hidden">
                {renderOrders(ORDER_STATUS.PENDING)}
              </TabPanel>
              <TabPanel pt={0} pb={0} overflow="hidden">
                {renderOrders(ORDER_STATUS.DOING)}
              </TabPanel>
              <TabPanel pt={0} pb={0} overflow="hidden">
                {renderOrders(ORDER_STATUS.DELIVERY)}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {renderOrderDetails}
        {renderOrderDetailsModal}
      </Flex>
    </AdminLayout>
  )
}

export default Orders
