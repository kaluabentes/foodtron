import axios from "axios"
import { useEffect, useState } from "react"
import useSWR from "swr"

import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/providers/axios/api"
import Order from "../types/Order"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

interface GetOrderResponse {
  order: Order
  mutate: () => void
}

const useGetOrder = (orderId: string): GetOrderResponse => {
  const toast = useBottomToast()

  const {
    data: order,
    error,
    mutate,
  } = useSWR(`/api/orders/${orderId}`, fetcher)

  useEffect(() => {
    if (error) {
      toast({
        title: "Atenção",
        description: error.message,
        status: "error",
      })
    }
  }, [error])

  return {
    order,
    mutate,
  }
}

export default useGetOrder
