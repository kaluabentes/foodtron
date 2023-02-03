import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Product from "../types/Product"

const useCreateProduct = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isCreating, setIsCreating] = useState(false)

  const createProduct = async (data: Product) => {
    try {
      setIsCreating(true)

      await axios.post("/api/products", data)

      toast({
        title: "Feito!",
        description: "Produto criado com sucesso.",
      })

      router.push("/admin/products")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    } finally {
      setIsCreating(false)
    }
  }

  return { isCreating, createProduct }
}

export default useCreateProduct
