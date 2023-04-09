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
  isTransparent?: boolean
}

const MenuItem = ({
  onClick,
  children,
  icon,
  isActive = false,
  isClosed = false,
  isLight = false,
  isTransparent = false,
}: MenuItemProps) => {
  return (
    <Tooltip
      label=""
      placement="right"
      color="white"
      backgroundColor="gray.800"
    >
      <Box
        as="li"
        listStyleType="none"
        borderRadius={7}
        transition="0.2s"
        backgroundColor={
          isTransparent ? undefined : isActive ? "brand.50" : "white"
        }
        color={isActive ? "brand.500" : "gray.500"}
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
          <Flex alignItems="center" padding={3}>
            <Icon fontSize="20px" as={icon} />
          </Flex>
          <Text
            fontSize="sm"
            padding={2}
            margin={0}
            fontWeight={isActive ? "500" : "400"}
            visibility={isClosed ? "hidden" : "visible"}
            opacity={isClosed ? "0" : "1"}
            transition="0.3s"
            whiteSpace="nowrap"
          >
            {children}
          </Text>
        </Flex>
      </Box>
    </Tooltip>
  )
}

export default MenuItem
