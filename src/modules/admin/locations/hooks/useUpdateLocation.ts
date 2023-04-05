import { useToast } from "@chakra-ui/react"
import { StoreDeliveryLocation } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export interface UpdateLocationData {
  neighborhood: string
  tax: string
  estimatedTime: string
}

const useUpdateLocation = (locationId: string) => {
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const updateLocation = async (data: UpdateLocationData) => {
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
      console.log("> Update location: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return { updateLocation, isSaving }
}

export default useUpdateLocation
