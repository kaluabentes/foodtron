import LandpageNav from "@/components/LandpageNav"
import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

interface LandpageLayoutProps {
  children: ReactNode
}

const LandpageLayout = ({ children }: LandpageLayoutProps) => (
  <Box height="100vh" width="100vw" background="white" overflowY="auto">
    <LandpageNav />
    <Box as="main">{children}</Box>
  </Box>
)

export default LandpageLayout
