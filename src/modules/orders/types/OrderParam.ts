import OrderProduct from "./OrderProduct"

export interface OrderParam {
  id?: string
  tax?: string
  paymentMethod?: string
  change?: string
  address?: string
  storeId?: string
  status?: string
  username?: string
  phone?: string
  estimatedTime?: string
  reasonForCancellation?: string
  orderProducts?: OrderProduct[]
}
