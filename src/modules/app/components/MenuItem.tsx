import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import subWord from "@/lib/helpers/string/subWord"
import Product from "@/modules/products/types/Product"
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

interface MenuItemProps {
  product: Product
  onClick: (product: Product) => void
}

const MenuItem = ({ product, onClick }: MenuItemProps) => (
  <Box
    sx={{
      "&:last-of-type .separator": {
        display: "none",
      },
    }}
  >
    <Box
      onClick={() => onClick(product)}
      as="button"
      width="full"
      textAlign="left"
      p={{ base: 4, md: 6 }}
      backgroundColor="white"
    >
      <Flex gap={2}>
        <Box flex={1} marginRight={2}>
          <Heading mb={2} fontSize="md" fontWeight="500">
            {product.title}
          </Heading>
          <Text mb={2} color="gray.500" fontSize="sm">
            {product.description && subWord(product.description, 0, 7)}
          </Text>
          <Text fontWeight="500" fontSize="sm">
            {formatToRealCurrency(Number(product.price))}
          </Text>
        </Box>
        <Image
          height={{ base: "100px", md: "120px" }}
          width={{ base: "100px", md: "120px" }}
          borderRadius="18px"
          objectFit="cover"
          src={product.image ? product.image : "/placeholder.png"}
        />
      </Flex>
    </Box>
    <Box pl={4} pr={4} background="white">
      <Box
        className="separator"
        height="0.8px"
        width="100%"
        backgroundColor="gray.200"
      />
    </Box>
  </Box>
)

export default MenuItem
