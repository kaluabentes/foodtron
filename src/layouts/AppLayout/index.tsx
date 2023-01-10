import ActionButton from "@/components/ActionButton"
import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react"
import { ReactNode, useEffect, useRef, useState } from "react"
import { FaRegSave } from "react-icons/fa"

import AppBar from "./AppBar"
import SideNav from "./SideNav"

interface AppLayoutProps {
  children: ReactNode
  isFullWidth?: boolean
  hasPadding?: boolean
  isActionButtonLoading?: boolean
  onActionClick?: () => void
}

const AppLayout = ({
  children,
  isFullWidth = false,
  hasPadding = true,
  isActionButtonLoading,
  onActionClick,
}: AppLayoutProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [isActionButtonShow, setIsActionButtonShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current?.scrollTop! > 30) {
        setIsActionButtonShow(true)
      } else {
        setIsActionButtonShow(false)
      }
    }

    scrollContainerRef.current?.addEventListener("scroll", handleScroll)

    return () =>
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const localIsClosed = JSON.parse(localStorage.getItem("SideNav.isClosed")!)
    setIsClosed(localIsClosed)
  }, [])

  const handleToggle = () =>
    setIsClosed((prev) => {
      localStorage.setItem("SideNav.isClosed", JSON.stringify(!prev))
      return !prev
    })

  const renderNavigation = useBreakpointValue({
    base: (
      <AppBar
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNotificationClick={() => {}}
      />
    ),
    lg: <SideNav isClosed={isClosed} onToggle={handleToggle} />,
  })

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      {isActionButtonShow && onActionClick && (
        <ActionButton isLoading={isActionButtonLoading} onClick={onActionClick}>
          <FaRegSave size="25px" />
        </ActionButton>
      )}
      {renderNavigation}
      <Box ref={scrollContainerRef} height="100vh" overflow="auto" width="100%">
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

export default AppLayout
