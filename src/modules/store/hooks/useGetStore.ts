import axios from "axios"
import { useEffect, useState } from "react"

import useBottomToast from "@/lib/hooks/useBottomToast"

const useGetStore = (id: string) => {
  const toast = useBottomToast()

  const [isLoading, setIsLoading] = useState(false)
  const [store, setStore] = useState({})

  const getStore = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`/api/store/${id}`)
      setStore(response.data)
    } catch (error: any) {
      toast({
        title: "Não deu boa!",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getStore()
  }, [id])

  return { getStore, isLoading, store }
}

export default useGetStore
