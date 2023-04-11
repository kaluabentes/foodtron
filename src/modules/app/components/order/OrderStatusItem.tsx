import formatDate from "@/lib/helpers/date/formatDate"
import formatTime from "@/lib/helpers/date/formatTime"
import { ORDER_STATUS } from "@/modules/admin/orders/constants"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiCheck } from "react-icons/bi"

interface OrderStatusItemProps {
  icon: ReactNode
  title: string
  description: string
  createdAt?: string | Date
  stepStatus: "pending" | "current" | "done"
  isLastItem?: boolean
  isDone?: boolean
}

const OrderStatusItem = ({
  icon,
  title,
  description,
  createdAt,
  stepStatus,
  isLastItem,
  isDone,
}: OrderStatusItemProps) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    gap={3}
    pt={2}
    pb={2}
    position="relative"
  >
    <Flex width="100%" alignItems="start" gap={3} position="relative">
      {!isLastItem && (
        <Box
          height="94%"
          transform="translate(7px, 31px)"
          width="1px"
          position="absolute"
          background="gray.100"
          bottom={0}
        />
      )}
      {stepStatus === "current" && (
        <Flex
          width="15px"
          height="15px"
          borderRadius="50%"
          background="orange"
          color="white"
          alignItems="center"
          animation={!isDone ? "pulse 2s infinite" : undefined}
          justifyContent="center"
          transform="translateY(13px)"
        >
          {isDone && <BiCheck />}
        </Flex>
      )}
      {stepStatus === "pending" && (
        <Box
          width="15px"
          height="15px"
          borderRadius="50%"
          border="4px solid transparent"
          borderColor="gray.300"
          transform="translateY(13px)"
        />
      )}
      {stepStatus === ORDER_STATUS.DONE && (
        <Flex
          color="white"
          width="15px"
          height="15px"
          borderRadius="50%"
          background="orange.200"
          alignItems="center"
          justifyContent="center"
          transform="translateY(13px)"
        >
          <BiCheck />
        </Flex>
      )}
      <Box
        fontSize="40px"
        opacity={
          stepStatus === "pending" || stepStatus === ORDER_STATUS.DONE
            ? "0.4"
            : undefined
        }
        color="brand.500"
      >
        {icon}
      </Box>
      <Flex justifyContent="space-between" flex={1}>
        <Box width="100%">
          <Heading
            opacity={
              stepStatus === "pending" || stepStatus === ORDER_STATUS.DONE
                ? "0.4"
                : undefined
            }
            as="h2"
            fontSize="md"
            fontWeight="600"
            mb={1}
          >
            {title}
          </Heading>
          <Text
            opacity={
              stepStatus === "pending" || stepStatus === ORDER_STATUS.DONE
                ? "0.4"
                : undefined
            }
            fontSize="sm"
          >
            {description}
          </Text>
        </Box>
        {createdAt && (
          <Text
            opacity={
              stepStatus === "pending" || stepStatus === ORDER_STATUS.DONE
                ? "0.4"
                : undefined
            }
            fontSize="xs"
            color={stepStatus === ORDER_STATUS.DONE ? "gray.600" : "gray.400"}
          >
            {formatTime(String(createdAt))}
          </Text>
        )}
      </Flex>
    </Flex>
  </Flex>
)

export default OrderStatusItem
