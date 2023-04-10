import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IconActionButtonProps {
  onClick?: () => void
  icon: ReactNode
  zIndex?: number
  size?: "sm" | "md"
}

const IconActionButton = ({
  onClick,
  icon,
  zIndex,
  size = "md",
}: IconActionButtonProps) => (
  <Flex
    zIndex={zIndex}
    as={onClick ? "button" : undefined}
    onClick={onClick}
    color="gray.500"
    background="white"
    border="2px solid transparent"
    borderColor="gray.300"
    width={size === "md" ? "28px" : "22px"}
    height={size === "md" ? "28px" : "22px"}
    borderRadius="50%"
    justifyContent="center"
    alignItems="center"
  >
    {icon}
  </Flex>
)

export default IconActionButton
