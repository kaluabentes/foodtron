import ActionButton from "@/components/ActionButton"
import AppBar from "@/components/AppBar"
import BarIconButton from "@/components/BarIconButton"
import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react"
import { User } from "@prisma/client"
import { get } from "lodash"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"
import { BiBell } from "react-icons/bi"
import { FaRegSave } from "react-icons/fa"

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

  const [isClosed, setIsClosed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () =>
    setIsClosed((prev) => {
      localStorage.setItem("SideNav.isClosed", JSON.stringify(!prev))
      return !prev
    })

  useEffect(() => {
    const localIsClosed = JSON.parse(localStorage.getItem("SideNav.isClosed")!)
    setIsClosed(localIsClosed)
  }, [])

  useEffect(() => {
    console.log("data", data)
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
    lg: <SideNav isClosed={isClosed} onToggle={handleToggle} />,
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
