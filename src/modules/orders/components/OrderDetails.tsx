import { Badge, Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

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

interface OrderDetailsProps {
  order: Order
}

const OrderDetails = ({ order }: OrderDetailsProps) => (
  <>
    <Flex
      alignItems="start"
      justifyContent="space-between"
      background="white"
      p={{ base: 4, md: 6 }}
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
      <Box p={{ base: 4, md: 6 }} display="flex" flexDirection="column" gap={4}>
        <EditableDataItem field="Status" value={order.status} />
        <StripeSeparator horizontal />
        <EditableDataItem
          field="Data de criação"
          value={formatDate(String(order.createdAt))}
        />
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
        <StripeSeparator horizontal />
        {order.paymentMethod === "Dinheiro" && (
          <EditableDataItem
            field="Troco pra quanto?"
            value={formatToRealCurrency(Number(order.change))}
          />
        )}
        <StripeSeparator horizontal />
        {order.paymentMethod === "Dinheiro" && (
          <EditableDataItem
            field="Taxa de entrega"
            value={formatToRealCurrency(Number(order.tax))}
          />
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
      <Flex background="white" p={{ base: 4, md: 6 }} justifyContent="end">
        <Button colorScheme="brand">Confirmar</Button>
      </Flex>
    </Box>
  </>
)

export default OrderDetails
