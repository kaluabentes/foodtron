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
    background="white"
    color="gray.700"
    aria-label={label}
    fontSize="23px"
    icon={icon}
    _hover={{
      backgroundColor: "gray.200",
    }}
    _active={{
      backgroundColor: "gray.200",
    }}
  />
)

export default BarIconButton
