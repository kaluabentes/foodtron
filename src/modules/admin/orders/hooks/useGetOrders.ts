import { useEffect, useState } from "react"
import useSWR from "swr"

import api from "@/lib/infra/axios/api"
import Order from "../types/Order"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

const useGetOrders = (isArchive = false) => {
  const { data: orders, mutate } = useSWR(
    isArchive ? "/api/orders?isArchive=true" : "/api/orders",
    fetcher
  )

  const getOrders = () => {
    mutate()
  }

  return {
    orders,
    getOrders,
  }
}

export default useGetOrders
