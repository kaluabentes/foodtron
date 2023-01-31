import AppBar from "@/components/AppBar"
import BarIconButton from "@/components/BarIconButton"
import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react"
import { get } from "lodash"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"
import { BiBell } from "react-icons/bi"

import SideNav from "./SideNav"

interface AdminLayoutProps {
  children: ReactNode
  isFullWidth?: boolean
  hasPadding?: boolean
  isActionButtonLoading?: boolean
  onActionClick?: () => void
}

const AdminLayout = ({
  children,
  isFullWidth = false,
  hasPadding = true,
}: AdminLayoutProps) => {
  const { data, status } = useSession()
  const user = get(data, "user", undefined)
  const router = useRouter()

  const [isClosed, setIsClosed] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status])

  const renderNavigation = useBreakpointValue({
    base: (
      <AppBar
        isOpen={isOpen}
        leftIcon={<BarIconButton label="Menu" icon={<BiBell />} />}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    ),
    lg: <SideNav isClosed={isClosed} setIsClosed={setIsClosed} />,
  })

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {renderNavigation}
      <Box height="100vh" overflow="auto" width="100%">
        <Container
          maxWidth={{ base: "100%", md: isFullWidth ? "100%" : "container.lg" }}
          padding={hasPadding ? undefined : 0}
          as="main"
          marginTop={{ base: "60px", lg: "0" }}
        >
          {children}
        </Container>
      </Box>
    </Flex>
  )
}

export default AdminLayout
