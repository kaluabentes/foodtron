import axios from "axios"
import { useEffect, useState } from "react"
import useSWR from "swr"

import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/providers/axios/api"
import { useAppContext } from "@/contexts/app"

const useGetUser = () => {
  const toast = useBottomToast()
  const {
    state: {
      user: { token },
    },
  } = useAppContext()
  const headers = {
    Authorization: token,
  }

  const fetcher = (url: string) =>
    api.get(url, { headers }).then((res) => res.data)
  const { data: user, error } = useSWR(token ? `/api/profile` : null, fetcher)

  useEffect(() => {
    if (error) {
      toast({
        title: "Atenção",
        description: error.message,
        status: "error",
      })
    }
  }, [error])

  return {
    user,
  }
}

export default useGetUser
