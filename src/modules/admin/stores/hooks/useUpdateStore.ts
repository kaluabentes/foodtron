import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

import StoreParam from "../types/StoreParam"

const useUpdateStore = () => {
  const toast = useBottomToast()

  const [isSaving, setIsSaving] = useState(false)

  const updateStore = async (data: StoreParam) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/stores/update", data)
      return Promise.resolve()
    } catch (error: any) {
      toast({
        title: "Não deu boa!",
        description: error.message,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return { updateStore, isSaving }
}

export default useUpdateStore
