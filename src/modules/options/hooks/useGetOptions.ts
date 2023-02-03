import axios from "axios"
import { useEffect, useState } from "react"

const useGetOptions = () => {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getOptions = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get("/api/options")

      setOptions(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  return { options, getOptions, isLoading }
}

export default useGetOptions
