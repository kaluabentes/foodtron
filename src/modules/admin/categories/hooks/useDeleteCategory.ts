import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

const useDeleteCategory = () => {
  const toast = useBottomToast()

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteCategory = async (id: string) => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/categories/${id}`)

      toast({ title: "Feito!", description: "Horário deletado com sucesso." })

      return Promise.resolve()
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deleteCategory }
}

export default useDeleteCategory
