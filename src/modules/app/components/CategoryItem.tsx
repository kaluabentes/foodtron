import SectionTitle from "@/components/SectionTitle"
import Category from "@/modules/admin/categories/types/Category"
import Product from "@/modules/admin/products/types/Product"
import { Box, Heading } from "@chakra-ui/react"
import MenuItem from "./MenuItem"

interface CategoryItemProps {
  category: Category
  onMenuItemClick: (product: Product) => void
}

const CategoryItem = ({ category, onMenuItemClick }: CategoryItemProps) => (
  <Box borderRadius="md" overflow="hidden" boxShadow="sm">
    <SectionTitle>{category.title}</SectionTitle>
    {category?.products?.map((product: Product) => (
      <MenuItem onClick={onMenuItemClick} key={product.id} product={product} />
    ))}
  </Box>
)

export default CategoryItem
