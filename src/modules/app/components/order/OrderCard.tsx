import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import {
  Badge,
  Box,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { KeyboardEventHandler } from "react"
import { BiMap } from "react-icons/bi"
import sumOrderSubtotal from "@/modules/admin/orders/lib/sumOrderSubtotal"
import Order from "@/modules/admin/orders/types/Order"
import {
  ORDER_STATUS_COLOR_SCHEME,
  ORDER_STATUS_TEXT,
} from "@/modules/admin/orders/constants"
import handleKeyDown from "@/lib/infra/browser/handleKeyDown"
import getNeighborhood from "@/modules/admin/orders/lib/getNeighborhood"

interface OrderCardProps {
  order: Order
  isCancelling?: boolean
  onClick: () => void
  onCancel?: () => void
}

const OrderCard = ({
  order,
  onClick,
  onCancel,
  isCancelling,
}: OrderCardProps) => (
  <Box
    cursor="pointer"
    role="button"
    tabIndex={0}
    onKeyDown={handleKeyDown(onClick)}
    background="white"
    key={order.id}
    p={4}
    position="relative"
    display="block"
    width="100%"
    onClick={onClick}
    textAlign="left"
    borderRadius="md"
    shadow="sm"
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Badge>ID: {order.id}</Badge>
      {isCancelling ? (
        <Spinner color="brand.500" size="sm" />
      ) : (
        <CloseButton
          onClick={(event) => {
            event.stopPropagation()

            if (onCancel) {
              onCancel()
            }
          }}
          color="gray.500"
          p={4}
          width="12px"
          height="12px"
        />
      )}
    </Flex>
    <Flex
      justifyContent="space-between"
      alignItems="start"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Box>
        <Heading fontSize="lg" fontWeight="700" mb={1}>
          {order.orderProducts
            .map((product) => `${product.quantity} ${product.title}`)
            .join(", ")}
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
    <Flex
      zIndex="20"
      position="relative"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="500">
        {formatToRealCurrency(
          sumOrderSubtotal(order.orderProducts) + Number(order.tax)
        )}
      </Text>
      <Box textAlign="right">
        <Badge colorScheme={ORDER_STATUS_COLOR_SCHEME[order.status]}>
          {ORDER_STATUS_TEXT[order.status]}
        </Badge>
      </Box>
    </Flex>
  </Box>
)

export default OrderCard
