import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import PageHeader from "@/components/PageHeader"
import AdminLayout from "@/layouts/AdminLayout"
import auth from "@/middlewares/auth"
import useGetOrders from "@/modules/orders/hooks/useGetOrders"
import Order from "@/modules/orders/types/Order"
import range from "@/lib/helpers/array/range"
import { ORDER_STATUS } from "@/modules/orders/constants"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return auth(context, ["admin"])
}

const Orders = () => {
  const { orders, isLoading } = useGetOrders()

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

    console.log("filteredOrders", filteredOrders)

    return filteredOrders.map((order: Order) => (
      <Box
        key={order.id}
        borderBottom="1px solid transparent"
        borderColor="gray.100"
        p={4}
        pl={0}
        pr={0}
      >
        <Badge mb={4} fontWeight="500">
          ID: {order.id}
        </Badge>
        <Heading fontSize="lg" fontWeight="600">
          {order.username}
        </Heading>
      </Box>
    ))
  }

  return (
    <AdminLayout isFullWidth>
      <PageHeader title="Pedidos" />
      <Box background="white" borderRadius="md" shadow="sm">
        <Tabs colorScheme="brand">
          <TabList
            overflowX={{ base: "auto", md: "initial" }}
            overflowY={{ base: "hidden", md: "initial" }}
          >
            <Tab
              flex={1}
              fontWeight="500"
              textTransform="uppercase"
              fontSize="sm"
            >
              Aguardando
            </Tab>
            <Tab
              flex={1}
              fontWeight="500"
              textTransform="uppercase"
              fontSize="sm"
            >
              Fazendo
            </Tab>
            <Tab
              flex={1}
              fontWeight="500"
              textTransform="uppercase"
              fontSize="sm"
            >
              Entrega
            </Tab>
            <Tab
              flex={1}
              fontWeight="500"
              textTransform="uppercase"
              fontSize="sm"
            >
              Finalizado
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{renderOrders(ORDER_STATUS.PENDING)}</TabPanel>
            <TabPanel>{renderOrders(ORDER_STATUS.DOING)}</TabPanel>
            <TabPanel>{renderOrders(ORDER_STATUS.DELIVERY)}</TabPanel>
            <TabPanel>{renderOrders(ORDER_STATUS.DONE)}</TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </AdminLayout>
  )
}

export default Orders
