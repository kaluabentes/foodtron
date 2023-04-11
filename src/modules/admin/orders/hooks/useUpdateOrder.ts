import api from "@/lib/providers/axios/api"
import { useState } from "react"
import { OrderParam } from "../types/OrderParam"

const useUpdateOrder = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [orderId, setOrderId] = useState<string | undefined>()

  const updateOrder = async (id: string, order: OrderParam) => {
    try {
      setIsUpdating(true)
      setOrderId(id)
      const response = await api.patch(`/api/orders/${id}`, order)
      return response.data
    } catch (error: any) {
      console.error("Create order error: ", error.message)
    } finally {
      setOrderId(undefined)
      setIsUpdating(false)
    }
  }

  return {
    isUpdating,
    updateOrder,
    orderId,
  }
}

export default useUpdateOrder
