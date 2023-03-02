import useBottomToast from "@/lib/hooks/useBottomToast"
import axios from "axios"
import { useState } from "react"

interface ScheduleParam {
  id?: string
  weekDay?: string
  start?: string
  end?: string
  isScheduledClosing?: boolean
  isEnabled?: boolean
}

const useUpdateSchedule = () => {
  const toast = useBottomToast()

  const [isUpdating, setIsUpdating] = useState(false)

  const updateSchedule = async (scheduleId: string, data: ScheduleParam) => {
    try {
      setIsUpdating(true)
      await axios.patch(`/api/schedules/${scheduleId}`, data)
      toast({ title: "Feito!", description: "Horário editado com sucesso." })
      return Promise.resolve()
    } catch (error: any) {
      toast({ title: "Erro!", description: error.message })
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, updateSchedule }
}

export default useUpdateSchedule
