import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

import Schedule from "../types/Schedule"

const useAddSchedule = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isAdding, setIsAdding] = useState(false)

  const addSchedule = async (data: Schedule) => {
    try {
      setIsAdding(true)

      const response = await axios.post("/api/schedules", data)

      toast({
        title: "Feito!",
        description: "Horário de funcionamento criado com sucesso.",
      })

      router.push("/admin/schedules")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isAdding, addSchedule }
}

export default useAddSchedule
