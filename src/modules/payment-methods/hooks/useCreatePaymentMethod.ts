import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import useBottomToast from "@/lib/hooks/useBottomToast"
import PaymentMethod from "../types/PaymentMethod"

const useCreatePaymentMethod = () => {
  const router = useRouter()
  const toast = useBottomToast()

  const [isSaving, setIsSaving] = useState(false)

  const createPaymentMethod = async (data: PaymentMethod) => {
    try {
      setIsSaving(true)
      await axios.post("/api/payment-methods", data)
      toast({
        title: "Feito!",
        description: "Método de pagamento criado com sucesso.",
      })
      router.push("/admin/payment-methods")
    } catch (error: any) {
      toast({ title: "Error!", description: error.message })
    }
  }

  return { createPaymentMethod, isSaving }
}

export default useCreatePaymentMethod
