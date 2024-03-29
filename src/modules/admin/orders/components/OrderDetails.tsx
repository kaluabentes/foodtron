import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api"

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
import { useEffect, useState } from "react"

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
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    setShowMap(false)
  }, [order])

  return (
    <>
      <Box background="white" overflow="hidden">
        <Box
          p={{ base: 4, md: 6 }}
          pb={{ base: 0, md: 0 }}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <EditableDataItem
            field="ID"
            value={
              <Heading fontSize="1xl" textTransform="uppercase">
                {order.id}
              </Heading>
            }
          />
          <StripeSeparator horizontal />
          <EditableDataItem field="Nome" value={order.username} />
          <StripeSeparator horizontal />
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
            value={formatDate(String(order.createdAt), true)}
          />
          <StripeSeparator horizontal />
          {realtimeOrder ? (
            <EditableDataItem
              field="Data de última modificação"
              value={formatDate(String(realtimeOrder.updatedAt), true)}
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
          {order.latitude && (
            <Button
              alignSelf="start"
              size="sm"
              onClick={() => setShowMap((prev) => !prev)}
            >
              {showMap ? "Fechar mapa" : "Mostrar mapa"}
            </Button>
          )}

          <Box
            transition="0.5s"
            height={showMap ? "400px" : "0px"}
            overflow="hidden"
          >
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "400px",
                }}
                center={{ lat: order.latitude, lng: order.longitude }}
                zoom={15}
              >
                <MarkerF
                  position={{ lat: order.latitude, lng: order.longitude }}
                />
              </GoogleMap>
            </LoadScript>
          </Box>

          <StripeSeparator horizontal />
          <EditableDataItem field="Pagamento" value={order.paymentMethod} />
          <StripeSeparator horizontal />
          {order.paymentMethod === "Dinheiro" && (
            <>
              <EditableDataItem
                field="Troco para quanto?"
                value={formatToRealCurrency(Number(order.change))}
              />
            </>
          )}
        </Box>
      </Box>

      <Box background="white" overflow="hidden">
        <SectionTitle isBorderless>Produtos</SectionTitle>
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
          isLast
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
