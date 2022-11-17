import { IconButton } from "@chakra-ui/react"
import { ReactElement } from "react"

interface BarIconButtonProps {
  label: string
  icon: ReactElement
  onClick: () => void
}

const BarIconButton = ({ label, icon, onClick }: BarIconButtonProps) => (
  <IconButton
    onClick={onClick}
    background="gray.900"
    color="white"
    aria-label={label}
    fontSize="23px"
    icon={icon}
    _hover={{
      backgroundColor: "gray.700",
    }}
    _active={{
      backgroundColor: "gray.700",
    }}
  />
)

export default BarIconButton
