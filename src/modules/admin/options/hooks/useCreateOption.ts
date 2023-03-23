import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import OptionGroup from "../types/OptionGroup"

const useCreateOption = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isCreating, setIsCreating] = useState(false)

  const createOption = async (data: OptionGroup) => {
    try {
      setIsCreating(true)

      await axios.post("/api/options", data)

      toast({
        title: "Feito!",
        description: "Opção criado com sucesso.",
      })

      router.push("/admin/options")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    } finally {
      setIsCreating(false)
    }
  }

  return { isCreating, createOption }
}

export default useCreateOption
