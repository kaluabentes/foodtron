import api from "@/lib/infra/axios/api"
import { useState } from "react"
import { OrderParam } from "../types/OrderParam"

const useCreateOrder = () => {
  const [isCreating, setIsCreating] = useState(false)

  const createOrder = async (order: OrderParam) => {
    try {
      setIsCreating(true)
      const response = await api.post("/api/orders", order)
      return response.data
    } catch (error: any) {
      console.error("Create order error: ", error.message)
    } finally {
      setIsCreating(false)
    }
  }

  return {
    isCreating,
    createOrder,
  }
}

export default useCreateOrder
