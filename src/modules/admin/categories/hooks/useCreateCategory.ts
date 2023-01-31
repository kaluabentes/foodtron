import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Category from "../types/Category"

const useCreateCategory = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isCreating, setIsCreating] = useState(false)

  const createCategory = async (data: Category) => {
    try {
      setIsCreating(true)

      await axios.post("/api/categories", data)

      toast({
        title: "Feito!",
        description: "Categoria criada com sucesso.",
      })

      router.push("/admin/categories")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    } finally {
      setIsCreating(false)
    }
  }

  return { isCreating, createCategory }
}

export default useCreateCategory
