import subWord from "@/lib/helpers/string/subWord"
import Product from "@/modules/products/types/Product"
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

interface MenuItemProps {
  product: Product
  onClick: (product: Product) => void
}

const MenuItem = ({ product, onClick }: MenuItemProps) => (
  <Box
    onClick={() => onClick(product)}
    as="button"
    width="full"
    textAlign="left"
    p={4}
    pb={0}
    backgroundColor="white"
  >
    <Flex>
      <Box flex={1} marginRight={2}>
        <Heading mb={1} fontSize="lg" fontWeight="500">
          {product.title}
        </Heading>
        <Text mb={2} color="gray.500" fontSize="sm">
          {product.description && subWord(product.description, 0, 7)}
        </Text>
        <Text fontWeight="500">{product.price}</Text>
      </Box>
      <Image
        height="120px"
        width="120px"
        borderRadius="18px"
        objectFit="cover"
        src={product.image}
      />
    </Flex>
    <Box mt={4} height="0.8px" width="100%" backgroundColor="gray.200" />
  </Box>
)

export default MenuItem
