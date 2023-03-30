import useBottomToast from "@/lib/hooks/useBottomToast"
import { useToast } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Store from "../types/Store"

const useUpdateStore = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isSaving, setIsSaving] = useState(false)

  const updateStore = async (data: Store) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/stores/update", data)

      if (data.isOpen) {
        toast({
          title: "Feito!",
          description: "Agora o restaurante está aberto",
          status: "success",
        })
      } else {
        toast({
          title: "Feito!",
          description: "Agora o restaurante está fechado",
          status: "error",
        })
      }

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
