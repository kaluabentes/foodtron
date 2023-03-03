import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"
import { BiMap } from "react-icons/bi"
import sumOrderSubtotal from "../lib/sumOrderSubtotal"
import Order from "../types/Order"

interface OrderCardProps {
  order: Order
  isActive: boolean
  onClick: () => void
}

const getNeighborhood = (address: string) => {
  const addressParts = address.split(" ")
  return addressParts[addressParts.length - 1]
}

const OrderCard = ({ order, isActive, onClick }: OrderCardProps) => (
  <Box
    key={order.id}
    borderBottom="1px solid transparent"
    borderColor="gray.100"
    p={4}
    pl={0}
    pr={0}
    position="relative"
    as="button"
    display="block"
    width="100%"
    onClick={onClick}
    textAlign="left"
  >
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Badge fontWeight="500">ID: {order.id}</Badge>
      <CloseButton color="gray.500" p={4} width="12px" height="12px" />
    </Flex>
    <Flex justifyContent="space-between" alignItems="start" mb={4}>
      <Box>
        <Heading fontSize="lg" fontWeight="500" mb={1}>
          {order.username}
        </Heading>
        <Text fontSize="xs" color="gray.500" mb={4}>
          {formatDate(String(order.createdAt), true)}
        </Text>
      </Box>
      <Flex gap={1} alignItems="center">
        <Icon color="brand.500" fontSize="20px" as={BiMap} />
        <Text fontWeight="500" fontSize="sm">
          {getNeighborhood(order.address)}
        </Text>
      </Flex>
    </Flex>
    <Flex justifyContent="space-between" alignItems="end">
      <Text fontSize="xl" fontWeight="700">
        {formatToRealCurrency(
          sumOrderSubtotal(order.orderProducts) + Number(order.tax)
        )}
      </Text>
      <Button lineHeight="0" colorScheme="brand" size="sm">
        Confirmar
      </Button>
    </Flex>
    {isActive ? (
      <>
        <Box
          position="absolute"
          height="100%"
          width="3px"
          background="brand.500"
          top="0"
          right="0"
          transform="translate(16px)"
        />
        <Box
          position="absolute"
          height="100%"
          width="100%"
          background="gray.300"
          opacity="0.1"
          top="0"
          left="0"
          transform="scaleX(1.5)"
        />
      </>
    ) : null}
  </Box>
)

export default OrderCard
