import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Store from "@/modules/admin/stores/types/Store"
import { Box, Text } from "@chakra-ui/react"

interface MinimumOrderPriceProps {
  store: Store
}

const MinimumOrderPrice = ({ store }: MinimumOrderPriceProps) => (
  <Text>
    <Box as="span" fontWeight="500" fontSize="md">
      Pedido mínimo:
    </Box>{" "}
    <Box as="span">{formatToRealCurrency(Number(store.minimumOrderPrice))}</Box>
  </Text>
)

export default MinimumOrderPrice
