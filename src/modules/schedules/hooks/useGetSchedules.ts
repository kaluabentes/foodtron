import axios from "axios"
import { useEffect, useState } from "react"

const useGetSchedules = () => {
  const [schedules, setSchedules] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSchedules = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get("/api/schedules")

      setSchedules(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSchedules()
  }, [])

  return { schedules, getSchedules, isLoading }
}

export default useGetSchedules
