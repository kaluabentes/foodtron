import { Container, Flex, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode, useState } from "react"

import AppBar from "./AppBar"
import SideNav from "./SideNav"

interface AppLayoutProps {
  children: ReactNode
  isFullWidth?: boolean
  hasPadding?: boolean
}

const AppLayout = ({
  children,
  isFullWidth = false,
  hasPadding = true,
}: AppLayoutProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navigation = useBreakpointValue({
    base: (
      <AppBar
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNotificationClick={() => {}}
      />
    ),
    md: (
      <SideNav
        isClosed={isClosed}
        onToggle={() => setIsClosed((prev) => !prev)}
      />
    ),
  })

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {navigation}
      <Container
        maxWidth={{ base: "100%", md: isFullWidth ? "100%" : "container.xl" }}
        padding={hasPadding ? undefined : 0}
        as="main"
        marginTop={{ base: "60px", md: "0" }}
      >
        {children}
      </Container>
    </Flex>
  )
}

export default AppLayout
