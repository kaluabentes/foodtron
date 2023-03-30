import { useAppContext } from "@/contexts/app"
import { ORDER_STATUS } from "@/modules/admin/orders/constants"

const useActiveOrder = () => {
  const {
    state: {
      user: { orders },
    },
  } = useAppContext()

  const restOrders = []
    .filter(
      (order) =>
        ![ORDER_STATUS.CANCELLED, ORDER_STATUS.DONE].includes(order.status)
    )
    .reverse()

  return restOrders[0]
}

export default useActiveOrder
