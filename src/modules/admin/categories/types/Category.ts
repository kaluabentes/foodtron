import Product from "./Product"

interface Category {
  id?: string
  title: string
  products?: Product[]
}

export default Category
