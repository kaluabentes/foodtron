import createQuery from "@/lib/helpers/http/createQuery"
import axios from "axios"
import { useEffect, useState } from "react"

interface Query {
  domain?: string
}

const useGetProductsByDomain = (domain?: string) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getProducts = async () => {
    try {
      let response

      setIsLoading(true)

      const query: Query = {}

      if (domain) {
        query.domain = domain
      }

      response = await axios.get(
        process.env.NEXT_PUBLIC_URL + `/api/products${createQuery(query)}`
      )

      setProducts(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [domain])

  return { products, getProducts, isLoading }
}

export default useGetProductsByDomain
