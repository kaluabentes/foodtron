import Product from "./Product"

interface Category {
  id?: string
  title: string
  ordination: string
  products?: Product[]
}

export default Category
