import { useEffect, useState } from "react"

const useIsPageLoaded = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  return isPageLoaded
}

export default useIsPageLoaded
