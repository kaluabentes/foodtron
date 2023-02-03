import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

const useDeletePaymentMethod = () => {
  const toast = useBottomToast()

  const [isDeleting, setIsDeleting] = useState(false)

  const deletePaymentMethod = async (id: string) => {
    try {
      setIsDeleting(true)

      await axios.delete(`/api/payment-methods/${id}`)

      toast({
        title: "Feito!",
        description: "Método de pagamento deletado com sucesso.",
      })

      return Promise.resolve()
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deletePaymentMethod }
}

export default useDeletePaymentMethod
