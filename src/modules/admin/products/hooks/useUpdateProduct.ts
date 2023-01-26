import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Product from "../types/Product"

const useUpdateProduct = (productId: string) => {
  const router = useRouter()
  const toast = useBottomToast()

  const [isUpdating, setIsUpdating] = useState(false)

  const updateProduct = async (data: Product) => {
    try {
      setIsUpdating(true)

      await axios.patch(`/api/products/${productId}`, data)

      toast({ title: "Feito!", description: "Produto editado com sucesso." })

      router.push("/admin/products")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isUpdating, updateProduct }
}

export default useUpdateProduct
