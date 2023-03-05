import api from "@/lib/infra/axios/api"
import { useState } from "react"

interface OrderParam {
  id?: string
  tax?: string
  paymentMethod?: string
  change?: string
  address?: string
  storeId?: string
  status?: string
  username?: string
  phone?: string
  reasonForCancellation?: string
}

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
