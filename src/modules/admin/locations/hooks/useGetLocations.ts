import axios from "axios"
import { useEffect, useState } from "react"

const useGetLocations = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get(`/api/locations`)
      setLocations(response.data)

      return Promise.resolve()
    } catch (error: any) {
      console.log("> Delete location: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  return { getLocations, isLoading, locations }
}

export default useGetLocations
