import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Store from "@/modules/admin/stores/types/Store"
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react"

interface MinimumOrderPriceProps {
  store: Store
}

const MinimumOrderPrice = ({ store }: MinimumOrderPriceProps) => (
  <Flex
    direction={{ base: "column", lg: "row" }}
    alignItems={{ base: "end", lg: "start" }}
    gap={{ base: 0, lg: 1 }}
  >
    <Text
      as="span"
      fontSize={{ base: "xs", lg: "14px" }}
      fontWeight="400"
      color="gray.500"
    >
      {useBreakpointValue({
        base: "Pedido mínimo",
        lg: "Pedido mínimo:",
      })}
    </Text>
    <Box as="span" fontSize={{ base: "md" }}>
      {formatToRealCurrency(Number(store.minimumOrderPrice))}
    </Box>
  </Flex>
)

export default MinimumOrderPrice
