import AppBar from "@/components/AppBar"
import BarIconButton from "@/components/BarIconButton"
import Brand from "@/components/Brand"
import { bottomMenu, topMenu } from "@/config/adminMenu"
import {
  Box,
  Container,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react"
import { get } from "lodash"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"
import { BiBell } from "react-icons/bi"

import SideNav from "../../components/SideNav"

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
        topMenu={topMenu}
        bottomMenu={bottomMenu}
        leftIcon={<BarIconButton label="Menu" icon={<BiBell />} />}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    ),
    lg: (
      <SideNav
        topMenu={topMenu}
        bottomMenu={bottomMenu}
        header={
          <Brand
            logo="/comet-blue.svg"
            storeName={<Image height="12px" src="/comet-text.svg" />}
            blue
          />
        }
      />
    ),
  })

  return (
    <Flex direction={{ base: "column", lg: "row" }}>
      {renderNavigation}
      <Box height={{ base: "none", md: "100vh" }} overflow="auto" width="100%">
        <Container
          maxWidth={{
            base: "100%",
            md: isFullWidth ? "100%" : "container.md",
            lg: isFullWidth ? "100%" : "container.lg",
          }}
          padding={hasPadding ? undefined : 0}
          as="main"
        >
          {children}
        </Container>
      </Box>
    </Flex>
  )
}

export default AdminLayout
