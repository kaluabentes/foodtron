import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IconActionButtonProps {
  onClick?: () => void
  icon: ReactNode
  zIndex?: number
}

const IconActionButton = ({ onClick, icon, zIndex }: IconActionButtonProps) => (
  <Flex
    zIndex={zIndex}
    as={onClick ? "button" : undefined}
    onClick={onClick}
    color="gray.500"
    background="white"
    border="1px solid transparent"
    borderColor="gray.300"
    width="26px"
    height="26px"
    borderRadius="50%"
    justifyContent="center"
    alignItems="center"
  >
    {icon}
  </Flex>
)

export default IconActionButton
