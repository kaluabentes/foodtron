import Product from "../../products/types/Product"
import Schedule from "../../schedules/types/Schedule"

interface Store {
  id?: string
  name?: string
  logo?: string
  cover?: string
  address?: string
  city?: string
  state?: string
  cep?: string
  cnpj?: string
  whatsapp?: string
  subdomain?: string
  customDomain?: string
  minimumOrderPrice?: number
  isOpen?: boolean
  schedules?: Schedule[]
  products?: Product[]
}

export default Store
