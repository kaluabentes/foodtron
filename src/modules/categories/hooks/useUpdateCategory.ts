import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Category from "../types/Category"

const useUpdateCategory = (categoryId: string) => {
  const router = useRouter()
  const toast = useBottomToast()

  const [isUpdating, setIsUpdating] = useState(false)

  const updateCategory = async (data: Category) => {
    try {
      setIsUpdating(true)

      await axios.patch(`/api/categories/${categoryId}`, data)

      toast({ title: "Feito!", description: "Categoria editada com sucesso." })

      router.push("/admin/categories")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isUpdating, updateCategory }
}

export default useUpdateCategory
