import LandpageHeader from "@/components/LandpageHeader"
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ReactNode } from "react"

interface LandpageLayoutProps {
  children: ReactNode
}

const LandpageLayout = ({ children }: LandpageLayoutProps) => {
  const router = useRouter()

  return (
    <>
      <LandpageHeader onCTAClick={() => router.push("/auth/signin")} />
      <Box
        as="main"
        height="calc(100vh - 80px)"
        width="100vw"
        background="white"
        overflow="auto"
        mt="80px"
      >
        {children}
      </Box>
    </>
  )
}

export default LandpageLayout
