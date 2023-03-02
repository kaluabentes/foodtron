import { useEffect } from "react"
import useSWR from "swr"

import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/infra/axios/api"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

const useGetOrders = () => {
  const toast = useBottomToast()

  const { data: orders, error, isLoading } = useSWR(`/api/orders`, fetcher)

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
    isLoading,
  }
}

export default useGetOrders
