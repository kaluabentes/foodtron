import { Button } from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiCheckCircle } from "react-icons/bi"

interface OptionButtonProps {
  onClick: () => void
  isActive: boolean
  children: ReactNode
}

const OptionButton = ({ onClick, isActive, children }: OptionButtonProps) => (
  <Button
    onClick={onClick}
    variant="outline"
    width="full"
    borderWidth={isActive ? "3px" : undefined}
    borderColor={isActive ? "brand.500" : undefined}
    color={isActive ? "brand.500" : undefined}
  >
    {children}
  </Button>
)

export default OptionButton
