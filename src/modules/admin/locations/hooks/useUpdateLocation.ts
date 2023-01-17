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

const useUpdateLocation = (locationId: string) => {
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleDelete = async (data: AddLocationData) => {
    setIsSaving(true)

    try {
      await axios.patch(`/api/locations/${locationId}`, data)
      toast({
        title: "Feito!",
        description: "Local editado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
      router.push("/admin/locations")
    } catch (error: any) {
      console.log("> update location: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return { handleDelete, isSaving }
}

export default useUpdateLocation
