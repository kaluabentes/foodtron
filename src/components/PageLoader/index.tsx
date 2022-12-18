import { Box, Flex, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function PageLoader() {
  const router = useRouter()
  const [isShown, setIsShown] = useState(true)

  useEffect(() => {
    setIsShown(false)

    function handleStart() {
      setIsShown(true)
    }

    function handleStop() {
      setIsShown(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router.events])

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      background="white"
      visibility={isShown ? "visible" : "hidden"}
      opacity={isShown ? "1" : "0"}
      transition="0.5s"
      zIndex="100"
      position="fixed"
      top={0}
      left={0}
    >
      <Spinner color="brand.400" size="xl" />
    </Flex>
  )
}
