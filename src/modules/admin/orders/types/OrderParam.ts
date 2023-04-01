import OrderProduct from "./OrderProduct"

export interface OrderParam {
  id?: string
  tax?: string
  paymentMethod?: string
  change?: string
  address?: string
  latitude?: number
  longitude?: number
  storeId?: string
  status?: string
  username?: string
  phone?: string
  estimatedTime?: string
  userId?: string
  reasonForCancellation?: string
  orderProducts?: OrderProduct[]
}
