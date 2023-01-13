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
      color="gray.800"
      backgroundColor="white"
    >
      <Box
        as="li"
        listStyleType="none"
        borderRadius={7}
        transition="0.2s"
        backgroundColor={isActive ? "gray.200" : "white"}
        color={isActive ? "gray.900" : "gray.600"}
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
          <Flex
            alignItems="center"
            padding={3}
            paddingLeft={3}
            paddingRight={3}
          >
            <Icon fontSize="20px" as={icon} />
          </Flex>
          <Text fontSize="md" padding={2} margin={0}>
            {children}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}

export default MenuItem
