import { useAppContext } from "@/contexts/app"
import AppLayout from "@/layouts/AppLayout"
import auth from "@/middlewares/auth"
import OrderCard from "@/modules/app/components/order/OrderCard"
import Order from "@/modules/admin/orders/types/Order"
import { ROLE } from "@/modules/admin/users/constants"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import prisma from "@/lib/infra/prisma/client"
import StripeSeparator from "@/components/StripeSeparator"
import OrderDetailsModal from "@/modules/admin/orders/components/OrderDetailsModal"
import { useState } from "react"
import { useRouter } from "next/router"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { useSession } from "next-auth/react"
import EmptyState from "@/components/EmptyState"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useTranslation } from "react-i18next"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store: any) => ({
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
    include: {
      schedules: true,
    },
  })

  return {
    props: {
      schedules: store?.schedules,
    },
  }
}

interface OrdersProps {
  schedules: Schedule[]
}

const Orders = ({ schedules }: OrdersProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    state: {
      user: { token },
    },
  } = useAppContext()

  const [orderToShow, setOrderToShow] = useState<Order | undefined>()

  const renderOrders = () => {
    if (!schedules.length) {
      return <EmptyState message="Não há pedidos ainda" />
    }

    return (
      <Table sx={{ tableLayout: "fixed" }}>
        <Thead>
          <Th p={4}>{t("weekDay")}</Th>
          <Th p={4}>{t("start")}</Th>
          <Th p={4}>{t("end")}</Th>
        </Thead>
        <Tbody>
          {schedules.map((schedule: Schedule) => (
            <Tr>
              <Td p={4}>{weekDayMap.get(schedule.weekDay)}</Td>
              <Td p={4}>{schedule.isEnabled ? schedule.start : "---"}</Td>
              <Td p={4}>{schedule.isEnabled ? schedule.end : "---"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <AppLayout title="Horários">
      <Flex
        direction="column"
        gap={4}
        borderRadius="md"
        shadow="sm"
        backgroundColor="white"
        overflow="hidden"
        p={{ base: 4, md: 0 }}
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
