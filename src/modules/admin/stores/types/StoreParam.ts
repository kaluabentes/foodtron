import Product from "../../products/types/Product"
import Schedule from "../../schedules/types/Schedule"

interface StoreParam {
  id?: string
  name?: string
  logo?: string
  cover?: string
  address?: string
  city?: string
  state?: string
  cnpj?: string
  whatsapp?: string
  subdomain?: string
  customDomain?: string
  minimumOrderPrice?: string
  isOpen?: boolean
  schedules?: Schedule[]
  products?: Product[]
}

export default StoreParam
