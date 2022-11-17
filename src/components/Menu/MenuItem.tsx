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
  const textColor = (() => {
    if (isLight) {
      return isActive ? "gray.800" : "gray.500"
    }

    return isActive ? "white" : "gray.400"
  })()

  const iconColor = (() => {
    if (isLight) {
      return isActive ? "gray.800" : "gray.500"
    }

    return isActive ? "white" : "gray.400"
  })()

  const backgroundColor = (() => {
    if (isLight) {
      return isActive ? "gray.100" : "white"
    }

    return isActive ? "gray.800" : "gray.900"
  })()

  return (
    <Tooltip
      label={isClosed ? children : ""}
      placement="right"
      color="white"
      backgroundColor="gray.700"
    >
      <Box
        as="li"
        listStyleType="none"
        borderRadius={7}
        transition="0.2s"
        backgroundColor={backgroundColor}
        _hover={{
          backgroundColor: isLight ? "gray.100" : "gray.800",
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
          <Flex
            alignItems="center"
            padding={3}
            paddingLeft={3}
            paddingRight={3}
          >
            <Icon fontSize="20px" color={iconColor} as={icon} />
          </Flex>
          <Text
            color={textColor}
            fontSize="sm"
            padding={2}
            margin={0}
            fontWeight="medium"
          >
            {children}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}

export default MenuItem
