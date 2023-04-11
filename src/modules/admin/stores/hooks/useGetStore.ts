import axios from "axios"
import { useEffect, useState } from "react"
import useSWR from "swr"

import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/providers/axios/api"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

const useGetStore = (domain: string) => {
  const toast = useBottomToast()

  const { data: store, error } = useSWR(`/api/stores?domain=${domain}`, fetcher)

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
    store,
  }
}

export default useGetStore
