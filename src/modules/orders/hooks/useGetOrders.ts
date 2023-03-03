import { useEffect, useState } from "react"

import api from "@/lib/infra/axios/api"
import Order from "../types/Order"

const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[] | undefined>()

  const getOrders = async () => {
    try {
      const response = await api.get("/api/orders")
      setOrders(response.data)
      return Promise.resolve()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return {
    orders,
    setOrders,
    getOrders,
  }
}

export default useGetOrders
