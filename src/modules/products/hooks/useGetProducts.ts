import axios from "axios"
import { useEffect, useState } from "react"

const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getProducts = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get("/api/products")

      setProducts(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return { products, getProducts, isLoading }
}

export default useGetProducts
