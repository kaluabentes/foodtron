import SectionTitle from "@/components/SectionTitle"
import Category from "@/modules/admin/categories/types/Category"
import Product from "@/modules/admin/products/types/Product"
import { Box, Flex, Grid, Heading } from "@chakra-ui/react"
import MenuItem from "./MenuItem"

interface CategoryItemProps {
  category: Category
  onMenuItemClick: (product: Product) => void
}

const CategoryItem = ({ category, onMenuItemClick }: CategoryItemProps) => (
  <Box
    borderRadius="md"
    overflow={{ base: "hidden", lg: "initial" }}
    boxShadow={{ base: "sm", lg: "none" }}
  >
    <Heading
      p={{ base: 4, md: 6 }}
      pt={{ base: 4, md: 4, lg: 0 }}
      pl={{ base: 4, md: 6, lg: 0 }}
      pb={{ base: 4, md: 4 }}
      fontSize="17px"
      fontWeight="500"
      background={{ base: "white", lg: "transparent" }}
    >
      {category.title}
    </Heading>
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      gap={{ lg: 4 }}
    >
      {category?.products?.map((product: Product) => (
        <MenuItem
          onClick={onMenuItemClick}
          key={product.id}
          product={product}
        />
      ))}
    </Grid>
  </Box>
)

export default CategoryItem
