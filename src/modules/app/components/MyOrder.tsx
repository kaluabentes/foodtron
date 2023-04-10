import { Box, Button, Heading } from "@chakra-ui/react"
import OrderItemsSummary from "./order/OrderItemsSummary"
import AddressSelectButton from "./AddressSelectButton"

interface MyOrderProps {
  onAddressClick: () => void
  onConfirm: () => void
  address: string | undefined
}

const MyOrder = ({ onAddressClick, onConfirm, address }: MyOrderProps) => (
  <Box
    minWidth="400px"
    maxWidth="400px"
    background="white"
    position="fixed"
    right={4}
    top={0}
    height="100vh"
    boxShadow="sm"
    overflow="auto"
  >
    <Box
      boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.05);"
      pb={6}
      zIndex={2}
      position="relative"
    >
      <Heading p={6} pb={0} pt={6} fontSize="xl" fontWeight="600" mb={6}>
        Meu pedido
      </Heading>
      <Box pl={6} pr={6}>
        <AddressSelectButton
          onClick={onAddressClick}
          address={address}
          isBordered
        />
      </Box>
    </Box>

    <Box
      height="calc(100vh - 434px)"
      overflow="auto"
      zIndex={1}
      position="relative"
    >
      <OrderItemsSummary hideMinimumPrice section="items" />
    </Box>
    <Box
      position="absolute"
      width="100%"
      bottom={0}
      boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05);"
      zIndex={2}
      background="white"
    >
      <OrderItemsSummary hideMinimumPrice section="summary" />
      <Box p={6}>
        <Button onClick={onConfirm} width="full" colorScheme="brand">
          Fechar pedido
        </Button>
      </Box>
    </Box>
  </Box>
)

export default MyOrder
