import { useAppContext } from "@/contexts/app"
import AppLayout from "@/layouts/AppLayout"
import Order from "@/modules/admin/orders/types/Order"
import {
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import prisma from "@/lib/providers/prisma/client"
import OrderDetailsModal from "@/modules/admin/orders/components/OrderDetailsModal"
import { useState } from "react"
import { useRouter } from "next/router"
import EmptyState from "@/components/EmptyState"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useTranslation } from "react-i18next"
import StripeSeparator from "@/components/StripeSeparator"
import useGetStore from "@/modules/admin/stores/hooks/useGetStore"

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
      subdomain: store?.subdomain,
    },
  }
}

interface OrdersProps {
  schedules: Schedule[]
  subdomain: string
}

const Orders = ({ schedules, subdomain }: OrdersProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { store } = useGetStore(String(subdomain))

  const {
    state: {
      user: { token },
    },
  } = useAppContext()

  const [orderToShow, setOrderToShow] = useState<Order | undefined>()

  const renderSchedules = () => {
    if (!schedules.length) {
      return <EmptyState message="Não há horários ainda" />
    }

    return (
      <Table sx={{ tableLayout: "fixed" }}>
        <Thead>
          <Tr>
            <Th p={4}>{t("weekDay")}</Th>
            <Th p={4}>{t("start")}</Th>
            <Th p={4}>{t("end")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedules.map((schedule: Schedule) => (
            <Tr key={schedule.id}>
              <Td p={4} fontWeight="500">
                {weekDayMap.get(schedule.weekDay)}
              </Td>
              <Td p={4}>{schedule.isEnabled ? schedule.start : "Fechado"}</Td>
              <Td p={4}>{schedule.isEnabled ? schedule.end : "Fechado"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  const renderAddress = () => {
    if (!store) {
      return null
    }

    return (
      <Text color="gray.500">
        {store.address}
        <br />
        {store.city}/{store.state}
        <br />
        CEP: {store.cep}
      </Text>
    )
  }

  const renderOtherInfo = () => {
    if (!store) {
      return null
    }

    return <Text color="gray.500">CNPJ: {store.cnpj}</Text>
  }

  return (
    <AppLayout title="Informações">
      <Tabs background="white" colorScheme="brand">
        <TabList>
          <Tab fontWeight="500">Sobre</Tab>
          <Tab fontWeight="500">Horários</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Flex direction="column" gap={4} p={6}>
              <Text fontSize="xl" color="gray.600">
                Endereço
              </Text>
              {renderAddress()}
              <StripeSeparator horizontal />
              <Text fontSize="xl" color="gray.600">
                Outras informações
              </Text>
              {renderOtherInfo()}
            </Flex>
          </TabPanel>
          <TabPanel>{renderSchedules()}</TabPanel>
        </TabPanels>
      </Tabs>
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
