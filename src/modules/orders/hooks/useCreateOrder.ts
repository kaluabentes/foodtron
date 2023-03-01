import api from "@/lib/infra/axios/api"
import { useState } from "react"
import Order from "../types/Order"

const useCreateOrder = () => {
  const [isCreating, setIsCreating] = useState(false)

  const createOrder = async (order: Order) => {
    try {
      setIsCreating(true)
      const response = await api.post("/api/orders", order)
      const orderResponse = response.data
      console.log("orderResponse", orderResponse)
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
