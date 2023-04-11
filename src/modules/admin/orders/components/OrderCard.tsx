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
  Spinner,
  Text,
} from "@chakra-ui/react"
import { BiMap } from "react-icons/bi"
import { ORDER_STATUS } from "../constants"
import sumOrderSubtotal from "../lib/sumOrderSubtotal"
import Order from "../types/Order"
import getNeighborhood from "../lib/getNeighborhood"
import handleKeyDown from "@/lib/providers/browser/handleKeyDown"

interface OrderCardProps {
  order: Order
  isActive?: boolean
  isConfirming?: boolean
  onClick: () => void
  onConfirm?: () => void
  onCancel?: () => void
  isCancelling?: boolean
}

const OrderCard = ({
  order,
  isActive,
  isConfirming,
  onClick,
  onConfirm,
  onCancel,
  isCancelling,
}: OrderCardProps) => (
  <Box
    key={order.id}
    borderBottom="1px solid transparent"
    borderColor="gray.100"
    p={4}
    pl={0}
    pr={0}
    position="relative"
    cursor="pointer"
    role="button"
    tabIndex={0}
    onKeyDown={handleKeyDown(onClick)}
    display="block"
    width="100%"
    onClick={onClick}
    textAlign="left"
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Badge fontWeight="500">ID: {order.id}</Badge>
      {isCancelling ? (
        <Spinner color="brand.500" size="sm" />
      ) : (
        onCancel && (
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
        )
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
      <Button
        lineHeight="0"
        colorScheme="brand"
        size="sm"
        onClick={(event) => {
          event.stopPropagation()

          if (onConfirm) {
            onConfirm()
          }
        }}
        isLoading={isConfirming}
      >
        {order.status === ORDER_STATUS.PENDING && "Confirmar"}
        {order.status === ORDER_STATUS.DOING && "Despachar"}
        {order.status === ORDER_STATUS.DELIVERY && "Confirmar entrega"}
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
          zIndex="10"
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
          zIndex="10"
        />
      </>
    ) : null}
  </Box>
)

export default OrderCard
