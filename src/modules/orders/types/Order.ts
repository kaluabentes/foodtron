import OrderProduct from "./OrderProduct"

interface Order {
  tax: string
  paymentMethod: string
  change: string
  address: string
  storeId: string
  username: string
  phone: string
  orderProducts: OrderProduct[]
}

export default Order
