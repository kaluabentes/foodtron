import OrderProductOption from "./OrderProductOption"

interface OrderProduct {
  id?: string
  productId?: string
  title: string
  price: string
  quantity: number
  image: string
  observation: string
  orderId?: string
  options?: OrderProductOption[]
}

export default OrderProduct
