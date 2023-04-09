import { As, IconButton } from "@chakra-ui/react"
import { ReactElement } from "react"

interface BarIconButtonProps {
  as?: As
  label: string
  icon: ReactElement
  onClick?: () => void
  background?: string
}

const BarIconButton = ({
  as,
  background,
  label,
  icon,
  onClick,
}: BarIconButtonProps) => (
  <IconButton
    as={as}
    onClick={onClick}
    background={background ? background : "white"}
    color="gray.500"
    aria-label={label}
    fontSize="23px"
    icon={icon}
    _hover={{
      backgroundColor: "gray.100",
    }}
    _active={{
      backgroundColor: "gray.100",
    }}
  />
)

export default BarIconButton
