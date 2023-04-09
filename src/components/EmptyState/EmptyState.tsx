import { Flex, Heading, Icon } from "@chakra-ui/react"
import { BiFile } from "react-icons/bi"

interface EmptyStateProps {
  message: string
  isGray?: boolean
}

const EmptyState = ({ message, isGray }: EmptyStateProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    shadow="sm"
    backgroundColor={isGray ? "gray.50" : "white"}
    borderRadius="md"
    border="1px solid transparent"
    borderColor={isGray ? "gray.100" : "transparent"}
    overflow="auto"
    p={10}
    gap={7}
  >
    <Icon as={BiFile} fontSize="140px" color="gray.100" />
    <Heading fontWeight="400" fontSize="md" color="gray.500" textAlign="center">
      {message}
    </Heading>
  </Flex>
)

export default EmptyState
