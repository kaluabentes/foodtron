import LandpageFooter from "@/components/LandpageFooter"
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
        height="calc(100vh - 64px)"
        width="100vw"
        background="white"
        overflow="auto"
        mt="64px"
      >
        {children}

        <LandpageFooter />
      </Box>
    </>
  )
}

export default LandpageLayout
