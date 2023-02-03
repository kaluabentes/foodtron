import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Schedule from "../types/Schedule"

const useUpdateSchedule = (scheduleId: string) => {
  const router = useRouter()
  const toast = useBottomToast()

  const [isUpdating, setIsUpdating] = useState(false)

  const updateSchedule = async (data: Schedule) => {
    try {
      setIsUpdating(true)
      await axios.patch(`/api/schedules/${scheduleId}`, data)
      toast({ title: "Feito!", description: "Horário editado com sucesso." })
      router.push("/admin/schedules")
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    }
  }

  return { isUpdating, updateSchedule }
}

export default useUpdateSchedule
