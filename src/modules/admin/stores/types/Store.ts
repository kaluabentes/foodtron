import Product from "../../products/types/Product"
import Schedule from "../../schedules/types/Schedule"

interface Store {
  id?: string
  name?: string
  category?: string
  logo?: string
  cover?: string
  address?: string
  whatsapp?: string
  facebook?: string
  instagram?: string
  subdomain?: string
  customDomain?: string
  minimumOrderPrice?: Number
  isOpen?: boolean
  schedules?: Schedule[]
  products?: Product[]
}

export default Store