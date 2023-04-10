import { Flex, Heading, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BiFile } from "react-icons/bi"

interface EmptyStateProps {
  message: string
  isGray?: boolean
  icon?: IconType
}

const EmptyState = ({ message, isGray, icon }: EmptyStateProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="center"
    shadow={!isGray ? "sm" : "none"}
    backgroundColor={isGray ? "gray.50" : "white"}
    borderRadius="md"
    border="1px solid transparent"
    borderColor={isGray ? "gray.100" : "transparent"}
    overflow="auto"
    p={10}
    gap={7}
  >
    <Icon
      as={icon || BiFile}
      fontSize="130px"
      color={!isGray ? "gray.100" : "gray.200"}
    />
    <Heading fontWeight="500" fontSize="md" color="gray.700" textAlign="center">
      {message}
    </Heading>
  </Flex>
)

export default EmptyState
