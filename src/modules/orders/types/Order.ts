import OrderProduct from "./OrderProduct"

interface Order {
  id: string
  tax: string
  paymentMethod: string
  change: string
  address: string
  storeId: string
  status: string
  username: string
  phone: string
  orderProducts: OrderProduct[]
}

export default Order
