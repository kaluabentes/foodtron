import { Button, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ResponsiveButtonProps {
  onClick?: () => void
  type?: "submit" | "reset" | "button"
  isLoading?: boolean
  children: ReactNode
}

const ResponsiveButton = ({
  onClick,
  type,
  isLoading,
  children,
}: ResponsiveButtonProps) => (
  <Flex p={{ base: 4, md: 0 }} pt={{ base: 4, md: 4 }} justifyContent="start">
    <Button
      type={type}
      onClick={onClick}
      width={{ base: "full", md: "initial" }}
      minWidth="200px"
      colorScheme="brand"
      isLoading={isLoading}
    >
      {children}
    </Button>
  </Flex>
)

export default ResponsiveButton
