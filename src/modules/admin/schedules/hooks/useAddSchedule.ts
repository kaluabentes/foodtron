import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

import Schedule from "../types/Schedule"

const useAddSchedule = () => {
  const [isAdding, setIsAdding] = useState(false)
  const toast = useBottomToast()

  const addSchedule = async (data: Schedule) => {
    try {
      setIsAdding(true)

      const response = await axios.post("/api/schedules", data)

      console.log("created schedule", response.data)

      toast({
        title: "Feito!",
        description: "Horário de funcionamento criado com sucesso.",
      })
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isAdding, addSchedule }
}

export default useAddSchedule
