import { useEffect, useState } from "react"

import api from "@/lib/infra/axios/api"
import Order from "../types/Order"

const useGetOrders = (initialFetch = true) => {
  const [orders, setOrders] = useState<Order[] | undefined>()

  const getOrders = async (isArchive = false) => {
    try {
      const response = await api.get(
        isArchive ? "/api/orders?isArchive=true" : "/api/orders"
      )
      setOrders(response.data)
      return response.data
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (initialFetch) {
      getOrders()
    }
  }, [])

  return {
    orders,
    setOrders,
    getOrders,
  }
}

export default useGetOrders
