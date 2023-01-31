import Category from "../../categories/types/Category"
import OptionGroup from "../../options/types/OptionGroup"

interface Product {
  id?: string
  title: string
  description: string
  price: string
  image: string
  optionGroups?: OptionGroup[]
  disconnectOptionGroups?: OptionGroup[]
  categoryId?: String
  category: Category
}

export default Product
