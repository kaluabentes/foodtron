import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

const useDeleteProduct = () => {
  const toast = useBottomToast()

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteProduct = async (id: string) => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/products/${id}`)

      toast({ title: "Feito!", description: "Produto deletado com sucesso." })

      return Promise.resolve()
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deleteProduct }
}

export default useDeleteProduct
