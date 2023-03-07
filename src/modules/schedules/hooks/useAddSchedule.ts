import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import ScheduleParam from "../types/ScheduleParam"

const useAddSchedule = () => {
  const toast = useBottomToast()
  const router = useRouter()

  const [isAdding, setIsAdding] = useState(false)

  const addSchedule = async (data: ScheduleParam) => {
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
