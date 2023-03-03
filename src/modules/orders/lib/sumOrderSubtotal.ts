import OrderProduct from "../types/OrderProduct"
import sumProductTotal from "./sumProductTotal"

const sumOrderSubtotal = (orderProducts: OrderProduct[]) => {
  return orderProducts.reduce(
    (total, product) => total + sumProductTotal(product),
    0
  )
}

export default sumOrderSubtotal
