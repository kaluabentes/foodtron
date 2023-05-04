import api from "@/lib/providers/axios/api"
import { useState } from "react"
import StoreParam from "../types/StoreParam"

const fetchStore = (domain: string) => api.get(`/api/stores?domain=${domain}`)

export const useFetchStore = () => {
  const [store, setStore] = useState<undefined | StoreParam>()

  const fetch = async (domain: string) => {
    try {
      const response = await fetchStore(domain)

      setStore(response.data)

      return response.data
    } catch (error: any) {
      console.log("useFetchStore error: ", error)
    }
  }

  return {
    store,
    fetchStore: fetch,
  }
}

export default fetchStore
