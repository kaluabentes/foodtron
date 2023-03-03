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
import createChannel from "@/lib/infra/ably/createChannel"
import { BiMap } from "react-icons/bi"
import useBottomToast from "@/lib/hooks/useBottomToast"
import { once } from "lodash"
import sumOrderTotal from "@/modules/orders/lib/sumOrderTotal"

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

  const getNeighborhood = (address: string) => {
    const addressParts = address.split(" ")
    return addressParts[addressParts.length - 1]
  }

  const playNotificationSound = async () => {
    const audio = new Audio("/notification.mp3")
    await audio.play()
  }

  useChannel(user.store.subdomain!, async () => {
    await getOrders()
    await playNotificationSound()
    toast({
      title: "Oba",
      description: "Você recebeu um novo pedido",
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

    const filteredOrders = orders.filter(
      (order: Order) => order.status === status
    )

    if (!filteredOrders.length) {
      return (
        <Box mt={4}>
          <EmptyState isGray message="Não há pedidos no momento" />
        </Box>
      )
    }

    return filteredOrders.reverse().map((order: Order) => (
      <Box
        key={order.id}
        borderBottom="1px solid transparent"
        borderColor="gray.100"
        p={4}
        pl={0}
        pr={0}
        position="relative"
        as="button"
        display="block"
        width="100%"
        onClick={() => setSelectedOrder(order)}
        textAlign="left"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Badge fontWeight="500">ID: {order.id}</Badge>
          <CloseButton color="gray.500" p={4} width="12px" height="12px" />
        </Flex>
        <Flex justifyContent="space-between" alignItems="start" mb={4}>
          <Box>
            <Heading fontSize="lg" fontWeight="500" mb={1}>
              {order.username}
            </Heading>
            <Text fontSize="xs" color="gray.400" mb={4}>
              {formatDate(String(order.createdAt), true)}
            </Text>
          </Box>
          <Flex gap={1} alignItems="center">
            <Icon color="brand.500" fontSize="20px" as={BiMap} />
            <Text fontWeight="500" fontSize="sm">
              {getNeighborhood(order.address)}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="end">
          <Text fontSize="xl" fontWeight="700">
            {formatToRealCurrency(sumOrderTotal(order))}
          </Text>
          <Button lineHeight="0" colorScheme="brand" size="sm">
            Confirmar
          </Button>
        </Flex>
        {selectedOrder && selectedOrder.id === order.id ? (
          <>
            <Box
              position="absolute"
              height="100%"
              width="3px"
              background="brand.500"
              top="0"
              right="0"
              transform="translate(16px)"
            />
            <Box
              position="absolute"
              height="100%"
              width="100%"
              background="gray.300"
              opacity="0.1"
              top="0"
              left="0"
              transform="scaleX(1.5)"
            />
          </>
        ) : null}
      </Box>
    ))
  }

  return (
    <AdminLayout isFullWidth hasPadding={false}>
      <Box
        background="white"
        borderRadius="md"
        shadow="md"
        height="100vh"
        maxWidth="500px"
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
              Aguardando
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
    </AdminLayout>
  )
}

export default Orders
