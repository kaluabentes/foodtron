import OrderProduct from "../types/OrderProduct"

const sumProductTotal = (product: OrderProduct) => {
  return (
    Number(product.price) * product.quantity +
    product.options!.reduce(
      (total, opt) => total + opt.quantity * Number(opt.price),
      0
    )
  )
}

export default sumProductTotal
