import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Store from "@/modules/admin/stores/types/Store"
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react"

interface MinimumOrderPriceProps {
  store: Store
}

const MinimumOrderPrice = ({ store }: MinimumOrderPriceProps) => {
  const title = useBreakpointValue({
    base: "Pedido mínimo: ",
    lg: "Pedido mínimo",
  })

  return (
    <Flex
      direction={{ base: "row", lg: "column" }}
      alignItems={{ base: "center", lg: "end" }}
      gap={{ base: 1, lg: 0 }}
    >
      <Text as="span" fontSize={{ base: "md", lg: "14px" }} fontWeight="500">
        {title}
      </Text>
      <Box as="span" fontSize={{ base: "md" }}>
        {formatToRealCurrency(Number(store.minimumOrderPrice))}
      </Box>
    </Flex>
  )
}

export default MinimumOrderPrice
