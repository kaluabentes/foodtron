import axios from "axios"
import { useEffect, useState } from "react"

const useGetProductsByDomain = (domain: string) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getProducts = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get(
        process.env.NEXT_PUBLIC_URL + `/api/products?domain=${domain}`
      )

      setProducts(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (domain) {
      getProducts()
    }
  }, [domain])

  return { products, getProducts, isLoading }
}

export default useGetProductsByDomain
