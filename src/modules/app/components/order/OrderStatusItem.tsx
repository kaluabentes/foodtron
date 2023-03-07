import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiCheck } from "react-icons/bi"

interface OrderStatusItemProps {
  icon: ReactNode
  title: string
  description: string
  stepStatus: "pending" | "current" | "done"
  isLastItem?: boolean
  isDone?: boolean
}

const OrderStatusItem = ({
  icon,
  title,
  description,
  stepStatus,
  isLastItem,
  isDone,
}: OrderStatusItemProps) => (
  <Flex alignItems="center" gap={3} ml={2} pt={2} pb={2} position="relative">
    {!isLastItem && (
      <Box
        height="90%"
        transform="translate(7px, 66%)"
        width="1px"
        position="absolute"
        background="gray.200"
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
      />
    )}
    {stepStatus === "done" && (
      <Flex
        color="white"
        width="15px"
        height="15px"
        borderRadius="50%"
        background="orange.200"
        alignItems="center"
        justifyContent="center"
      >
        <BiCheck />
      </Flex>
    )}
    <Box
      fontSize="40px"
      opacity={
        stepStatus === "pending" || stepStatus === "done" ? "0.4" : undefined
      }
      color="brand.500"
    >
      {icon}
    </Box>
    <Box>
      <Heading
        opacity={
          stepStatus === "pending" || stepStatus === "done" ? "0.4" : undefined
        }
        as="h2"
        fontSize="md"
        fontWeight="600"
      >
        {title}
      </Heading>
      <Text
        opacity={
          stepStatus === "pending" || stepStatus === "done" ? "0.4" : undefined
        }
        fontSize="sm"
      >
        {description}
      </Text>
    </Box>
  </Flex>
)

export default OrderStatusItem
