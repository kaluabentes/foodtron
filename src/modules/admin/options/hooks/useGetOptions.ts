import useSWR from "swr"

import api from "@/lib/infra/axios/api"

const fetcher = (url: string) => api.get(url).then((res) => res.data)

const useGetOptions = () => {
  const { data: options, mutate } = useSWR("/api/options", fetcher)

  const getOptions = async () => {
    mutate()
  }

  return { options: options || [], getOptions, isLoading: !options }
}

export default useGetOptions
