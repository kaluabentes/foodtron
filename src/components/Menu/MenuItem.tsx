import {
  As,
  Box,
  Flex,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface MenuItemProps {
  onClick: () => void
  children: ReactNode
  icon: As
  isActive?: boolean
  isClosed?: boolean
  isLight?: boolean
}

const MenuItem = ({
  onClick,
  children,
  icon,
  isActive = false,
  isClosed = false,
  isLight = false,
}: MenuItemProps) => {
  return (
    <Tooltip
      label={isClosed ? children : ""}
      placement="right"
      color="white"
      backgroundColor="gray.800"
    >
      <Box
        as="li"
        listStyleType="none"
        borderRadius={7}
        transition="0.2s"
        backgroundColor={isActive ? "brand.50" : "white"}
        color={isActive ? "brand.500" : "gray.500"}
        _hover={{
          backgroundColor: "gray.200",
        }}
      >
        <Flex
          onClick={onClick}
          alignItems="center"
          as="button"
          width="100%"
          padding={0}
          background="transparent"
          border="none"
          fontSize="1rem"
        >
          <Flex alignItems="center" padding={3}>
            <Icon fontSize="20px" as={icon} />
          </Flex>
          <Text fontSize="sm" padding={2} margin={0} fontWeight="500">
            {children}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}

export default MenuItem
