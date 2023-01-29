import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import OptionGroup from "../types/OptionGroup"

const useUpdateOption = (productId: string) => {
  const router = useRouter()
  const toast = useBottomToast()

  const [isUpdating, setIsUpdating] = useState(false)

  const updateOption = async (data: OptionGroup) => {
    try {
      setIsUpdating(true)

      await axios.patch(`/api/options/${productId}`, data)

      toast({ title: "Feito!", description: "Opção editado com sucesso." })

      router.push("/admin/options")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isUpdating, updateOption }
}

export default useUpdateOption
