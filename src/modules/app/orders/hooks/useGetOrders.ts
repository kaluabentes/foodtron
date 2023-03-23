import axios from "axios"
import { useEffect, useState } from "react"
import useSWR from "swr"

import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/infra/axios/api"

const useGetOrders = (ids: string[]) => {
  const toast = useBottomToast()

  const fetcher = (url: string) => api.get(url).then((res) => res.data)

  const { data: orders, error } = useSWR(
    ids.length ? `/api/orders?ids=${ids.join(",")}` : null,
    fetcher
  )

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
    orders,
  }
}

export default useGetOrders
