import useSWR from "swr"

import api from "@/lib/providers/axios/api"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

const useUser = () => {
  const { data: user, error, mutate } = useSWR("api/auth/me", fetcher)

  return { user, mutate, error }
}

export default useUser
