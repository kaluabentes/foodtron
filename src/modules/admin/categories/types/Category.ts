import Product from "../../products/types/Product"

interface Category {
  id?: string
  title: string
  products?: Product[]
}

export default Category
