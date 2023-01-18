import { Flex, Heading, Icon } from "@chakra-ui/react"
import { BiFile } from "react-icons/bi"

interface EmptyStateProps {
  message: string
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    shadow="sm"
    backgroundColor="white"
    borderRadius="md"
    overflow="auto"
    marginBottom={8}
    p={10}
    gap={7}
  >
    <Icon as={BiFile} fontSize="140px" color="gray.200" />
    <Heading fontWeight="400" fontSize="md" color="gray.500">
      {message}
    </Heading>
  </Flex>
)

export default EmptyState
