import axios from "axios"
import { useEffect, useState } from "react"

const useGetCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCategories = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get("/api/categories")

      setCategories(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return { categories, getCategories, isLoading }
}

export default useGetCategories
