import { Box, Button, Heading } from "@chakra-ui/react"
import OrderItemsSummary from "./order/OrderItemsSummary"

const MyOrder = () => (
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
    <Heading p={6} pb={0} fontSize="lg" fontWeight="600" mb={4}>
      Meu pedido
    </Heading>
    <OrderItemsSummary />
    <Box p={6}>
      <Button width="full" colorScheme="brand">
        Fechar pedido
      </Button>
    </Box>
  </Box>
)

export default MyOrder
