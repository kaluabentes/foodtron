import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

const useDeleteOption = () => {
  const toast = useBottomToast()

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteOption = async (id: string) => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/options/${id}`)

      toast({ title: "Feito!", description: "Opção deletada com sucesso." })

      return Promise.resolve()
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deleteOption }
}

export default useDeleteOption
