import { OrderStatus } from "@prisma/client"
import OrderProduct from "./OrderProduct"

interface Order {
  id: string
  tax: string
  paymentMethod: string
  change: string
  address: string
  status: string
  username: string
  phone: string
  createdAt: string
  updatedAt: string
  estimatedTime: string
  storeId: string
  userId: string
  orderProducts: OrderProduct[]
  orderStatuses: OrderStatus[]
  reasonForCancellation: string
}

export default Order
