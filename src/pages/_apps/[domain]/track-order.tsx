import React, { useState } from "react"

import AppLayout from "@/layouts/AppLayout"
import { useRouter } from "next/router"
import BarIconButton from "@/components/BarIconButton"
import {
  BiCheckCircle,
  BiFile,
  BiHappyHeartEyes,
  BiLeftArrowAlt,
  BiRocket,
} from "react-icons/bi"
import prisma from "@/lib/infra/prisma/client"
import Order from "@/modules/orders/types/Order"
import useGetOrder from "@/modules/orders/hooks/useGetOrder"
import EditableDataItem from "@/components/EditableDataItem"
import formatDate from "@/lib/helpers/date/formatDate"
import PageLoader from "@/components/PageLoader"
import {
  Badge,
  Box,
  Button,
  Editable,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react"
import StripeSeparator from "@/components/StripeSeparator"
import OrderStatusItem from "@/modules/app/components/order/OrderStatusItem"
import { ORDER_STATUS } from "@/modules/orders/constants"
import { FaWhatsapp } from "react-icons/fa"
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal"
import Store from "@/modules/stores/types/Store"
import { useAppContext } from "@/contexts/app"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"

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

interface TrackOrderProps {
  store: Store
}

const TrackOrder = ({ store }: TrackOrderProps) => {
  const router = useRouter()
  const { id } = router.query

  const {
    state: {
      user: { token },
    },
  } = useAppContext()

  const { order } = useGetOrder(String(id))

  const [showDetails, setShowDetails] = useState(false)

  const renderContent = () => {
    if (!order) {
      return (
        <Flex justifyContent="center" height="200px" alignItems="center">
          <Spinner thickness="4px" size="xl" color="brand.500" />
        </Flex>
      )
    }

    return (
      <>
        {!token && <UserAccountWarning />}
        <Box
          background="white"
          overflow="hidden"
          borderRadius={{ base: undefined, lg: "md" }}
          shadow="sm"
        >
          <Flex p={{ base: 4, md: 6 }} gap={4} direction="column">
            <EditableDataItem field="ID" value={<Badge>{order.id}</Badge>} />
            <StripeSeparator horizontal />
            <EditableDataItem
              field="Data de criação"
              value={formatDate(String(order.createdAt), true)}
            />
            <StripeSeparator horizontal />
            <EditableDataItem
              field="Previsão de entrega"
              value={
                <Box
                  as="span"
                  fontWeight="700"
                  fontSize="xl"
                >{`${order.estimatedTime} min.`}</Box>
              }
            />
            <StripeSeparator horizontal />
            <OrderStatusItem
              icon={<BiFile />}
              title="Pedido enviado"
              description="Aguardando confirmação"
              stepStatus={
                order.status === ORDER_STATUS.PENDING ? "current" : "done"
              }
            />
            <OrderStatusItem
              icon={<BiCheckCircle />}
              title="Pedido confirmado"
              description="Estamos preparando o seu pedido"
              stepStatus={
                order.status === ORDER_STATUS.DOING
                  ? "current"
                  : order.status === ORDER_STATUS.DELIVERY ||
                    order.status === ORDER_STATUS.DONE
                  ? "done"
                  : "pending"
              }
            />
            <OrderStatusItem
              icon={<BiRocket />}
              title="Em trânsito"
              description="O pedido saiu para entrega"
              stepStatus={
                order.status === ORDER_STATUS.DELIVERY
                  ? "current"
                  : order.status === ORDER_STATUS.DONE
                  ? "done"
                  : "pending"
              }
            />
            <OrderStatusItem
              isLastItem
              isDone={order.status === ORDER_STATUS.DONE}
              icon={<BiHappyHeartEyes />}
              title="Pedido entregue"
              description="O pedido foi entregue com sucesso"
              stepStatus={
                order.status === ORDER_STATUS.DONE ? "current" : "pending"
              }
            />
            <Flex direction={{ base: "column", lg: "row" }} gap={3} mt={4}>
              <Button colorScheme="brand" onClick={() => setShowDetails(true)}>
                Detalhes
              </Button>
              <Button
                as="a"
                variant="outline"
                leftIcon={<FaWhatsapp />}
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar
              </Button>
              {order.status === ORDER_STATUS.PENDING && (
                <Button onClick={() => setShowDetails(true)}>Cancelar</Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </>
    )
  }

  return (
    <AppLayout
      hideCartButton
      title="Acompanhar pedido"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      {renderContent()}

      <OrderDetailsModal
        isOpen={showDetails}
        order={order}
        onClose={() => setShowDetails(false)}
      />
    </AppLayout>
  )
}

export default TrackOrder
