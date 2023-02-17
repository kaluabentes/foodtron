import Category from "@/modules/categories/types/Category"
import Product from "@/modules/products/types/Product"
import { Box, Heading } from "@chakra-ui/react"
import MenuItem from "./MenuItem"

interface CategoryItemProps {
  category: Category
  onMenuItemClick: (product: Product) => void
}

const CategoryItem = ({ category, onMenuItemClick }: CategoryItemProps) => (
  <Box marginTop={4} borderRadius="md" overflow="hidden" boxShadow="sm">
    <Heading
      backgroundColor="white"
      p={4}
      fontSize="md"
      fontWeight="500"
      borderBottom="1px solid transparent"
      borderColor="gray.100"
      background="gray.50"
    >
      {category.title}
    </Heading>
    {category?.products?.map((product: Product) => (
      <MenuItem onClick={onMenuItemClick} key={product.id} product={product} />
    ))}
  </Box>
)

export default CategoryItem
