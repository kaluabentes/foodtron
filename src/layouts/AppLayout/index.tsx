import { ReactNode, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Flex, Heading, Image, useBreakpointValue } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import CartButton from "@/components/CartButton"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import useBottomToast from "@/lib/hooks/useBottomToast"
import PageHeader from "@/components/PageHeader"
import { bottomMenu, topMenu } from "@/config/appMenu"
import SideNav from "@/components/SideNav"
import Brand from "@/components/Brand"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  rightIcon?: ReactNode
  hideCartButton?: boolean
}

const AppLayout = ({
  children,
  title,
  rightIcon,
  hideCartButton,
}: AppLayoutProps) => {
  const router = useRouter()
  const {
    state: {
      store,
      order: { products },
    },
  } = useAppContext()
  const toast = useBottomToast()

  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(true)

  const handleCartClick = () => {
    if (!products.length) {
      toast({
        title: "Atenção",
        description: "Adicione um produto",
        status: "error",
      })
      return
    }

    router.push("/order")
  }

  const renderAppBar = useBreakpointValue({
    base: (
      <AppBar
        topMenu={topMenu}
        bottomMenu={bottomMenu}
        isFixed
        title={
          <Heading fontSize="sm" fontWeight="500" textTransform="uppercase">
            {title}
          </Heading>
        }
        rightIcon={rightIcon}
        leftIcon={
          <CartButton onClick={handleCartClick} quantity={products.length} />
        }
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    ),
    lg: (
      <SideNav
        isClosed={isClosed}
        onClosedToggle={setIsClosed}
        header={
          store.logo ? (
            <Brand
              logo={store.logo}
              storeName={store.name}
              hideBrandText={isClosed}
              width="44px"
              height="44px"
            />
          ) : (
            <Brand
              hideBrandText={isClosed}
              logo="/comet-blue.svg"
              storeName={<Image height="12px" src="/comet-text.svg" />}
            />
          )
        }
        topMenu={topMenu}
        bottomMenu={bottomMenu}
      />
    ),
  })

  const renderShortcutDeck = useBreakpointValue({
    base: <ShortcutDeck />,
    lg: null,
  })

  const renderPageHeader = useBreakpointValue({
    base: null,
    lg: (
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Heading size="lg">{title}</Heading>
        {!hideCartButton && (
          <CartButton quantity={products.length} onClick={handleCartClick} />
        )}
      </Flex>
    ),
  })

  return (
    <Flex direction={{ base: "column", lg: "row" }}>
      {renderAppBar}
      <Box height={{ base: "none", md: "100vh" }} overflow="auto" width="100%">
        <Box
          as="main"
          paddingBottom="88px"
          paddingTop={{ base: "60px", lg: 4 }}
          maxWidth={{ base: "100%", md: "container.md" }}
          margin="0 auto"
          width="100%"
        >
          {renderPageHeader}
          {children}
        </Box>
      </Box>
      {renderShortcutDeck}
    </Flex>
  )
}

export default AppLayout
