import { useToast } from "@chakra-ui/react"
import { StoreDeliveryLocation } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

interface AddLocationData {
  neighborhood: string
  tax: string
  estimatedTime: string
}

const useAddLocation = () => {
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleSubmitCallback = async (data: AddLocationData) => {
    setIsSaving(true)

    try {
      await axios.post("/api/locations/add", data)
      toast({
        title: "Feito!",
        description: "Local criado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
      router.push("/admin/locations")
    } catch (error: any) {
      console.log("> Add location: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return { handleSubmitCallback, isSaving }
}

export default useAddLocation
