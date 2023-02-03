import { Box } from "@chakra-ui/react"
import { BiCart } from "react-icons/bi"
import BarIconButton from "../BarIconButton"

interface CartButtonProps {
  quantity: number
}

const CartButton = ({ quantity }: CartButtonProps) => (
  <Box position="relative">
    {quantity ? (
      <Box
        width="18px"
        height="18px"
        background="brand.500"
        color="white"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="10px"
        position="absolute"
        zIndex="100"
        right="-1px"
        top="-1px"
        fontWeight="500"
      >
        {quantity}
      </Box>
    ) : null}
    <BarIconButton label="Carrinho" icon={<BiCart />} />
  </Box>
)

export default CartButton