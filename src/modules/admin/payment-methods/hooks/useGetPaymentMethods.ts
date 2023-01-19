import axios from "axios"
import { useEffect, useState } from "react"

const useGetPaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPaymentMethods = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/payment-methods")
      setPaymentMethods(response.data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPaymentMethods()
  }, [])

  return { paymentMethods, getPaymentMethods, isLoading }
}

export default useGetPaymentMethods
