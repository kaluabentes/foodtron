import IconActionButton from "@/components/IconActionButton/IconActionButton"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import OrderProduct from "@/modules/orders/types/OrderProduct"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { BiDotsHorizontalRounded, BiEdit, BiPlus } from "react-icons/bi"
import BaseOrderItem from "./BaseOrderItem"

interface OrderProductItemProps {
  product: OrderProduct
  productTotal: string
  onClick?: () => void
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
        <Flex direction="column" gap={1}>
          <Heading fontSize="md" fontWeight="500">
            {product.quantity} {product.title}
          </Heading>
          {product.options!.map((opt, index) => (
            <Text key={String(index + 1)} fontSize="sm" color="gray.500">
              {opt.quantity} {opt.title}
            </Text>
          ))}
          {product.observation && (
            <Text pt={2} fontSize="xs" color="gray.500">
              Obs.: {product.observation}
            </Text>
          )}
          {onClick && <IconActionButton icon={<BiDotsHorizontalRounded />} />}
        </Flex>
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
