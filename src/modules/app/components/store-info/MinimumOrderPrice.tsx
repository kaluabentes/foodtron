import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Store from "@/modules/admin/stores/types/Store"
import { Box, Text } from "@chakra-ui/react"

interface MinimumOrderPriceProps {
  store: Store
}

const MinimumOrderPrice = ({ store }: MinimumOrderPriceProps) => (
  <Text mb={8}>
    <Box as="span" color="gray.500" fontSize="md">
      Pedido mínimo:
    </Box>{" "}
    <Box as="span" fontWeight="500">
      {formatToRealCurrency(Number(store.minimumOrderPrice))}
    </Box>
  </Text>
)

export default MinimumOrderPrice
