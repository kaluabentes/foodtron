import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import PaymentMethod from "../types/PaymentMethod"

const useUpdatePaymentMethod = (id: string) => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)

  const updatePaymentMethod = async (data: PaymentMethod) => {
    try {
      setIsUpdating(true)

      await axios.patch(`/api/payment-methods/${id}`, data)

      toast({
        title: "Feito!",
        description: "Método de pagamento deletado com sucesso.",
      })

      router.push("/admin/payment-methods")
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, updatePaymentMethod }
}

export default useUpdatePaymentMethod
