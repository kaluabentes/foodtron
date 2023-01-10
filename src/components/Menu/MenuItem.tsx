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
      backgroundColor="gray.700"
    >
      <Box
        as="li"
        listStyleType="none"
        borderRadius={7}
        transition="0.2s"
        backgroundColor={isActive ? "gray.100" : "white"}
        _hover={{
          backgroundColor: "gray.100",
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
            <Icon
              fontSize="20px"
              color={isActive ? "brand.500" : "gray.700"}
              as={icon}
            />
          </Flex>
          <Text
            color={isActive ? "brand.500" : "gray.700"}
            padding={2}
            margin={0}
          >
            {children}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}

export default MenuItem
