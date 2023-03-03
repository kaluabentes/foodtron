import Order from "../types/Order"

const sumOrderTotal = (order: Order) => {
  const orderProducts = order.orderProducts

  const sum = (sum: number, curr: any) =>
    sum + curr.quantity * Number(curr.price)

  const totalOptions = orderProducts
    .flatMap((ord) => ord.options)
    .reduce(sum, 0)

  const totalProducts = orderProducts.reduce(sum, 0)

  return totalOptions + totalProducts + Number(order.tax)
}

export default sumOrderTotal
