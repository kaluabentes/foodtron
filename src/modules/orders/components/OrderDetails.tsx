import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react"

import EditableDataItem from "@/components/EditableDataItem"
import SectionTitle from "@/components/SectionTitle"
import StripeSeparator from "@/components/StripeSeparator"
import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import BaseOrderItem from "@/modules/app/components/order/BaseOrderItem"
import OrderProductItem from "@/modules/app/components/order/OrderProductItem"

import sumOrderSubtotal from "../lib/sumOrderSubtotal"
import sumProductTotal from "../lib/sumProductTotal"
import Order from "../types/Order"
import {
  ORDER_STATUS,
  ORDER_STATUS_COLOR_SCHEME,
  ORDER_STATUS_TEXT,
} from "../constants"
import useGetOrder from "../hooks/useGetOrder"

interface OrderDetailsProps {
  order: Order
  isConfirming?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  isCancelling?: boolean
}

const OrderDetails = ({
  order,
  onConfirm,
  onCancel,
  isConfirming,
  isCancelling,
}: OrderDetailsProps) => {
  const { order: realtimeOrder } = useGetOrder(order.id)

  return (
    <>
      <Flex
        alignItems="start"
        justifyContent="space-between"
        background="white"
        p={{ base: 4, md: 8 }}
        direction={{ base: "column-reverse", md: "row" }}
        gap={4}
      >
        <Box>
          <Text fontWeight="500" fontSize="sm" mb={2}>
            Nome
          </Text>
          <Heading fontSize="2xl">{order.username}</Heading>
        </Box>
        <Box textAlign={{ base: "left", md: "right" }}>
          <Text mb={2} fontSize="xs" color="gray.400">
            Código de identificação
          </Text>
          <Badge fontSize="sm">{order.id}</Badge>
        </Box>
      </Flex>

      <Box
        background="white"
        overflow="hidden"
        borderTop="1px solid transparent"
        borderColor="gray.100"
      >
        <SectionTitle>Detalhes</SectionTitle>
        <Box
          p={{ base: 4, md: 8 }}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          {realtimeOrder ? (
            <EditableDataItem
              field="Status"
              value={
                <Badge
                  colorScheme={ORDER_STATUS_COLOR_SCHEME[realtimeOrder.status]}
                >
                  {ORDER_STATUS_TEXT[realtimeOrder.status]}
                </Badge>
              }
            />
          ) : (
            <Spinner color="gray.500" />
          )}
          {order.reasonForCancellation && (
            <>
              <StripeSeparator horizontal />
              <EditableDataItem
                field="Motivo de cancelamento"
                value={order.reasonForCancellation}
              />
            </>
          )}
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Data de criação"
            value={formatDate(String(order.createdAt))}
          />
          <StripeSeparator horizontal />
          {realtimeOrder ? (
            <EditableDataItem
              field="Data de última modificação"
              value={formatDate(String(realtimeOrder.updatedAt))}
            />
          ) : (
            <Spinner color="gray.500" />
          )}
          <StripeSeparator horizontal />
          <EditableDataItem
            field="Telefone"
            value={
              <Box
                as="a"
                color="brand.500"
                href={`https://wa.me/${order.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {order.phone}
              </Box>
            }
          />
          <StripeSeparator horizontal />
          <EditableDataItem field="Endereço" value={order.address} />
          <StripeSeparator horizontal />
          <EditableDataItem field="Pagamento" value={order.paymentMethod} />

          {order.paymentMethod === "Dinheiro" && (
            <>
              <StripeSeparator horizontal />
              <EditableDataItem
                field="Troco pra quanto?"
                value={formatToRealCurrency(Number(order.change))}
              />
            </>
          )}
        </Box>
      </Box>

      <Box
        background="white"
        overflow="hidden"
        borderTop="1px solid transparent"
        borderColor="gray.100"
      >
        <SectionTitle>Produtos</SectionTitle>
        {order.orderProducts.map((orderProduct) => (
          <OrderProductItem
            key={orderProduct.id}
            product={orderProduct}
            productTotal={formatToRealCurrency(sumProductTotal(orderProduct))}
          />
        ))}
        <BaseOrderItem
          leftSlot={<Text>Subtotal</Text>}
          rightSlot={
            <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
              {formatToRealCurrency(sumOrderSubtotal(order.orderProducts))}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text>Taxa de entrega</Text>}
          rightSlot={
            <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
              {order.tax ? formatToRealCurrency(Number(order.tax)) : "---"}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text fontWeight="500">Total</Text>}
          rightSlot={
            <Text
              fontSize="xl"
              fontWeight="700"
              mb={1}
              textAlign="right"
              color="brand.500"
            >
              {formatToRealCurrency(
                sumOrderSubtotal(order.orderProducts) + Number(order.tax)
              )}
            </Text>
          }
        />
        <Flex
          background="white"
          p={onCancel || onConfirm ? { base: 4, md: 6 } : undefined}
          justifyContent="end"
          gap={4}
        >
          {onCancel && (
            <Button onClick={onCancel} isLoading={isCancelling}>
              Cancelar
            </Button>
          )}
          {onConfirm && (
            <Button
              colorScheme="brand"
              onClick={onConfirm}
              isLoading={isConfirming}
            >
              {order.status === ORDER_STATUS.PENDING && "Confirmar"}
              {order.status === ORDER_STATUS.DOING && "Despachar"}
              {order.status === ORDER_STATUS.DELIVERY && "Confirmar entrega"}
            </Button>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default OrderDetails
