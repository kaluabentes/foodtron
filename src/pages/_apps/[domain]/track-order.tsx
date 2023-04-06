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
  BiXCircle,
} from "react-icons/bi"
import prisma from "@/lib/infra/prisma/client"
import Order from "@/modules/admin/orders/types/Order"
import useGetOrder from "@/modules/admin/orders/hooks/useGetOrder"
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
import { ORDER_STATUS } from "@/modules/admin/orders/constants"
import { FaWhatsapp } from "react-icons/fa"
import OrderDetailsModal from "@/modules/admin/orders/components/OrderDetailsModal"
import Store from "@/modules/admin/stores/types/Store"
import { useAppContext } from "@/contexts/app"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { OrderStatus } from "@prisma/client"
import ConfirmAlert from "@/components/ConfirmAlert"
import api from "@/lib/infra/axios/api"
import useBottomToast from "@/lib/hooks/useBottomToast"

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
      store: {
        whatsapp: store?.whatsapp,
      },
    },
  }
}

interface TrackOrderProps {
  store: Store
}

const TrackOrder = ({ store }: TrackOrderProps) => {
  const toast = useBottomToast()
  const router = useRouter()
  const { id } = router.query

  const {
    state: {
      user: { token },
    },
  } = useAppContext()

  const { order, mutate } = useGetOrder(String(id))

  const [showDetails, setShowDetails] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleOrderCancelConfirm = async () => {
    try {
      setIsCancelling(true)

      await api.patch(`/api/orders/cancel`, { orderId: order.id })

      mutate()

      toast({
        title: "Feito!",
        description: "Pedido cancelado com sucesso",
        status: "success",
      })
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
      })
    } finally {
      setShowCancelConfirm(false)
      setIsCancelling(false)
    }
  }

  const renderContent = () => {
    if (!order) {
      return (
        <Flex justifyContent="center" height="200px" alignItems="center">
          <Spinner thickness="4px" size="xl" color="brand.500" />
        </Flex>
      )
    }

    const getStatusCreatedAt = (status: string) => {
      const matchRule = (orderStatus: OrderStatus) =>
        orderStatus.status === status
      const filteredOrderStatuses = order.orderStatuses.filter(matchRule)
      const orderStatus =
        filteredOrderStatuses[filteredOrderStatuses.length - 1]

      if (orderStatus) {
        return orderStatus.createdAt
      }

      return undefined
    }

    return (
      <>
        {!token && <UserAccountWarning />}
        <Box p={{ base: 4, md: 0 }}>
          <Box
            background="white"
            overflow="hidden"
            borderRadius="md"
            shadow="md"
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
              {order.status === ORDER_STATUS.CANCELLED ? (
                <Flex direction="column" alignItems="center">
                  <Box color="gray.300" mb={4}>
                    <BiXCircle fontSize="100px" />
                  </Box>
                  <Text mb={2} fontWeight="600" fontSize="2xl">
                    O pedido foi cancelado
                  </Text>
                  <Text>
                    <strong>Motivo: </strong>
                    {order.reasonForCancellation}
                  </Text>
                </Flex>
              ) : (
                <Flex direction="column" gap={2}>
                  <OrderStatusItem
                    icon={<BiFile />}
                    title="Pedido enviado"
                    description="Aguardando confirmação"
                    createdAt={getStatusCreatedAt(ORDER_STATUS.PENDING)}
                    stepStatus={
                      order.status === ORDER_STATUS.PENDING ? "current" : "done"
                    }
                  />
                  <OrderStatusItem
                    icon={<BiCheckCircle />}
                    title="Pedido confirmado"
                    description="Estamos preparando o seu pedido"
                    createdAt={getStatusCreatedAt(ORDER_STATUS.DOING)}
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
                    createdAt={getStatusCreatedAt(ORDER_STATUS.DELIVERY)}
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
                    createdAt={getStatusCreatedAt(ORDER_STATUS.DONE)}
                    stepStatus={
                      order.status === ORDER_STATUS.DONE ? "current" : "pending"
                    }
                  />
                </Flex>
              )}
              <Flex direction={{ base: "column", lg: "row" }} gap={3} mt={4}>
                <Button
                  colorScheme="brand"
                  onClick={() => setShowDetails(true)}
                >
                  Detalhes
                </Button>
                {![ORDER_STATUS.CANCELLED, ORDER_STATUS.DONE].includes(
                  order.status
                ) && (
                  <Button
                    as="a"
                    variant="outline"
                    leftIcon={<FaWhatsapp />}
                    href={`https://api.whatsapp.com/send?phone=${store.whatsapp}&text=Olá,%20gostaria%20de%20conversar%20sobre%20o%20pedido%20*${order.id}*`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conversar
                  </Button>
                )}
                {order.status === ORDER_STATUS.PENDING && (
                  <Button onClick={() => setShowCancelConfirm(true)}>
                    Cancelar
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <AppLayout
      hideCartButton
      title="Acompanhar pedido"
      leftIcon={
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

      <ConfirmAlert
        title="Atenção"
        description="Você tem certeza que deseja cancelar seu pedido?"
        isOpen={showCancelConfirm}
        colorScheme="red"
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleOrderCancelConfirm}
        isLoading={isCancelling}
      />
    </AppLayout>
  )
}

export default TrackOrder
