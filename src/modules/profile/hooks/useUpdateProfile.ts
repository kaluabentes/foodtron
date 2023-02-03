import { useToast } from "@chakra-ui/react"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const useUpdateProfile = () => {
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleSubmitCallback = async (data: User) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/profile/update", data)
      toast({
        title: "Feito!",
        description: "Informações atualizados com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
      router.push("/admin/profile")
    } catch (error: any) {
      console.log("> Update store: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return { handleSubmitCallback, isSaving }
}

export default useUpdateProfile
