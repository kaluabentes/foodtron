import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import OrderProduct from "@/modules/orders/types/OrderProduct"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"
import BaseOrderItem from "./BaseOrderItem"

interface OrderProductItemProps {
  product: OrderProduct
  productTotal: string
  onClick: () => void
}

const OrderProductItem = ({
  productTotal,
  product,
  onClick,
}: OrderProductItemProps) => {
  return (
    <BaseOrderItem
      onClick={onClick}
      leftSlot={
        <>
          <Heading fontSize="md" fontWeight="500" mb={1}>
            {product.quantity} {product.title}
          </Heading>
          {product.options!.map((opt, index) => (
            <Text key={String(index + 1)} fontSize="sm" color="gray.500" mb={1}>
              {opt.quantity} {opt.title}
            </Text>
          ))}
          {product.observation && (
            <Text pt={2} fontSize="xs" color="gray.500">
              Obs.: {product.observation}
            </Text>
          )}
          <Flex
            color="gray.500"
            mt={2}
            shadow="md"
            width="22px"
            height="22px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
          >
            <BiEdit />
          </Flex>
        </>
      }
      rightSlot={
        <>
          <Text fontWeight="500" mb={1}>
            {productTotal}
          </Text>
          {product.options!.map((opt, optIndex) => (
            <Text
              key={String(optIndex + 1)}
              fontSize="sm"
              color="gray.500"
              mb={1}
            >
              {formatToRealCurrency(Number(opt.price) * opt.quantity)}
            </Text>
          ))}
        </>
      }
    />
  )
}

export default OrderProductItem
