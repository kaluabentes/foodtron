import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import subWord from "@/lib/helpers/string/subWord"
import Product from "@/modules/admin/products/types/Product"
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"

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
    border={{ lg: "2px solid white" }}
    _hover={{
      borderColor: "brand.500",
    }}
    borderRadius={{ lg: "md" }}
    overflow="hidden"
    shadow={{ lg: "sm" }}
    backgroundColor="white"
  >
    <Box
      onClick={() => onClick(product)}
      as="button"
      width="full"
      textAlign="left"
      p={{ base: 4, lg: 4 }}
    >
      <Flex gap={2}>
        <Box flex={1} marginRight={2}>
          <Heading mb={4} fontSize={{ base: "md", lg: "md" }} fontWeight="500">
            {product.title}
          </Heading>
          <Text mb={4} color="gray.500" fontSize="sm">
            {product.description && subWord(product.description, 0, 13)}
          </Text>
          <Text fontWeight="400" fontSize="md">
            {formatToRealCurrency(Number(product.price))}
          </Text>
        </Box>
        <Image
          height={{ base: "100px", md: "100px" }}
          width={{ base: "100px", md: "100px" }}
          borderRadius="xl"
          objectFit="cover"
          src={product.image ? product.image : "/placeholder.png"}
        />
      </Flex>
    </Box>

    {useBreakpointValue({
      base: (
        <Box pl={4} pr={4} background="white">
          <Box
            className="separator"
            height="1px"
            width="100%"
            backgroundColor="gray.200"
          />
        </Box>
      ),
      lg: null,
    })}
  </Box>
)

export default MenuItem
