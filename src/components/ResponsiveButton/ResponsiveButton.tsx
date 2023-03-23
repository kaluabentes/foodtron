import { As, Button, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ResponsiveButtonProps {
  onClick?: () => void
  type?: "submit" | "reset" | "button"
  isLoading?: boolean
  children: ReactNode
  colorScheme?: string | null
  variant?: string
  as?: As
}

const ResponsiveButton = ({
  onClick,
  type,
  isLoading,
  children,
  colorScheme = "brand",
  variant,
  as,
}: ResponsiveButtonProps) => (
  <Flex p={{ base: 4, md: 0 }} pt={{ base: 4, md: 4 }} justifyContent="start">
    <Button
      as={as}
      type={type}
      onClick={onClick}
      width={{ base: "full", md: "initial" }}
      minWidth="200px"
      colorScheme={colorScheme || undefined}
      variant={variant}
      isLoading={isLoading}
    >
      {children}
    </Button>
  </Flex>
)

export default ResponsiveButton
