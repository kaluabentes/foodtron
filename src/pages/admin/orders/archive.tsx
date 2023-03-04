import {
  Badge,
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import EmptyState from "@/components/EmptyState"
import PageHeader from "@/components/PageHeader"
import TableSkeleton from "@/components/TableSkeleton"
import AdminLayout from "@/layouts/AdminLayout"
import auth from "@/middlewares/auth"
import useGetOrders from "@/modules/orders/hooks/useGetOrders"
import formatDate from "@/lib/helpers/date/formatDate"
import {
  ORDER_STATUS_COLOR_SCHEME,
  ORDER_STATUS_TEXT,
} from "@/modules/orders/constants"
import { useEffect, useState } from "react"
import {
  BiArrowBack,
  BiArrowToLeft,
  BiBullseye,
  BiChevronLeft,
  BiInfoCircle,
} from "react-icons/bi"
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal"
import Order from "@/modules/orders/types/Order"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const OrdersArchive = () => {
  const router = useRouter()

  const { orders, getOrders } = useGetOrders(false)

  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()

  useEffect(() => {
    getOrders(true)
  }, [])

  const renderData = () => {
    if (!orders) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!orders.length) {
      return <EmptyState message="Não há pedidos ainda" />
    }

    return (
      <Box
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="auto"
        marginBottom={8}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Status</Th>
              <Th>Última atualização</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr>
                <Td>
                  <Badge>{order.id}</Badge>
                </Td>
                <Td fontWeight="500">{order.username}</Td>
                <Td>
                  <Badge colorScheme={ORDER_STATUS_COLOR_SCHEME[order.status]}>
                    {ORDER_STATUS_TEXT[order.status]}
                  </Badge>
                </Td>
                <Td fontSize="sm" fontWeight="500">
                  {formatDate(String(order.updatedAt))}
                </Td>
                <Td>
                  <IconButton
                    onClick={() => setSelectedOrder(order)}
                    aria-label="Ver detalhes"
                    icon={<BiInfoCircle />}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  }

  return (
    <AdminLayout>
      <Box pt={5} pl={0} pr={0}>
        <Button onClick={() => router.push("/admin/orders")} variant="outline">
          Voltar
        </Button>
      </Box>
      <PageHeader title="Arquivo de pedidos" />
      {renderData()}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={Boolean(selectedOrder)}
          order={selectedOrder}
          onClose={() => setSelectedOrder(undefined)}
        />
      )}
    </AdminLayout>
  )
}

export default OrdersArchive
