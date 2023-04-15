import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Store from "@/modules/admin/stores/types/Store"
import { Box, Flex, Text } from "@chakra-ui/react"

interface MinimumOrderPriceProps {
  store: Store
}

const MinimumOrderPrice = ({ store }: MinimumOrderPriceProps) => (
  <Flex
    direction={{ base: "row" }}
    alignItems={{ base: "center" }}
    gap={{ base: 1 }}
  >
    <Text as="span" fontSize={{ base: "md", lg: "14px" }} fontWeight="500">
      Pedido mínimo:
    </Text>
    <Box as="span" fontSize={{ base: "md" }}>
      {formatToRealCurrency(Number(store.minimumOrderPrice))}
    </Box>
  </Flex>
)

export default MinimumOrderPrice
