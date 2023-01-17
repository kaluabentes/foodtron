import axios from "axios"
import { useState } from "react"

const useGetLocations = (preloadedLocations: any[] = []) => {
  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState(preloadedLocations)

  const getLocations = async (storeId: string) => {
    setIsLoading(true)

    try {
      const response = await axios.get(`/api/locations?storeId=${storeId}`)
      setLocations(response.data)
      return Promise.resolve()
    } catch (error: any) {
      console.log("> Delete location: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  return { getLocations, isLoading, locations }
}

export default useGetLocations
