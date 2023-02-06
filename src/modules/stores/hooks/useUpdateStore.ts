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
      toast({
        title: "Feito!",
        description: "Informações atualizados com sucesso",
      })
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
