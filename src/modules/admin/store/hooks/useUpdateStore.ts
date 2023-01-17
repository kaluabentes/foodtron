import { useToast } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import StoreProps from "../types/StoreProps"

const useUpdateStore = () => {
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleSubmitCallback = async (data: StoreProps) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/store/update", data)
      toast({
        title: "Feito!",
        description: "Informações atualizados com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
      router.push("/admin/store")
    } catch (error: any) {
      console.log("> Update store: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return { handleSubmitCallback, isSaving }
}

export default useUpdateStore
