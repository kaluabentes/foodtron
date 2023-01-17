import axios from "axios"
import { useState } from "react"

import useBottomToast from "@/lib/hooks/useBottomToast"

const useDeleteLocation = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const toast = useBottomToast()

  const deleteLocation = async (id: string) => {
    setIsDeleting(true)

    try {
      await axios.delete(`/api/locations/${id}`)
      toast({
        title: "Feito!",
        description: "Local deletado com sucesso",
      })

      return Promise.resolve()
    } catch (error: any) {
      console.log("> Delete location: ", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteLocation, isDeleting }
}

export default useDeleteLocation
