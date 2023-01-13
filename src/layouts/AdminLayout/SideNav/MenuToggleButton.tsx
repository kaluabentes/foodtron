import { Box, Icon } from "@chakra-ui/react"
import { BiMenu } from "react-icons/bi"

interface MenuToggleButtonProps {
  onClick: () => void
}

const MenuToggleButton = ({ onClick }: MenuToggleButtonProps) => (
  <Box
    as="button"
    onClick={onClick}
    position="absolute"
    top="50px"
    right="-15px"
    height="30px"
    width="30px"
    borderRadius="50%"
    boxShadow="0px 0px 7px 1px rgba(0, 0, 0, 0.1)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    background="white"
  >
    <Icon as={BiMenu} />
  </Box>
)

export default MenuToggleButton
