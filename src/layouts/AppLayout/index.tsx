import { ReactNode, useEffect, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Flex, Heading, Image, useBreakpointValue } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import CartButton from "@/components/CartButton"
import { useAppContext, DEFAULT_USER } from "@/contexts/app"
import { useRouter } from "next/router"
import useBottomToast from "@/lib/hooks/useBottomToast"
import PageHeader from "@/components/PageHeader"
import { bottomMenu, topMenu } from "@/config/appMenu"
import SideNav from "@/components/SideNav"
import Brand from "@/components/Brand"
import useGetStore from "@/modules/stores/hooks/useGetStore"
import PageLoaderSpinner from "@/components/PageLoaderSpinner"
import { BiPowerOff } from "react-icons/bi"
import { FaWhatsapp } from "react-icons/fa"

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
  const { setState, mutateState, state } = useAppContext()
  const {
    isReady,
    order: { products },
    user: { token },
  } = state
  const toast = useBottomToast()

  const { store } = useGetStore(String(router.query.domain))

  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(true)

  const commonBottomMenu = [
    {
      icon: FaWhatsapp,
      label: "Conversar",
      path: "/admin/store",
      onClick: () => {
        window.open(`https://wa.me/${store.whatsapp}`, "_blank")
      },
    },
  ]

  const authBottomMenu = token
    ? [
        ...bottomMenu,
        ...commonBottomMenu,
        {
          icon: BiPowerOff,
          label: "Sair",
          onClick: () => {
            mutateState({
              ...state,
              user: DEFAULT_USER,
            })
          },
        },
      ]
    : [...bottomMenu, ...commonBottomMenu]

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

  useEffect(() => {
    if (isReady) {
      setState({
        store: store,
      })
    }
  }, [isReady])

  const renderHeader = (isClosed = false) =>
    store && store.logo ? (
      <Brand
        logo={store.logo}
        storeName={store.name}
        hideBrandText={isClosed}
        width="44px"
        height="44px"
      />
    ) : (
      <Brand
        logo="/comet-blue.svg"
        hideBrandText={isClosed}
        storeName={<Image height="12px" src="/comet-text.svg" />}
      />
    )

  const renderAppBar = useBreakpointValue({
    base: (
      <AppBar
        topMenu={topMenu}
        bottomMenu={authBottomMenu}
        isFixed
        title={
          <Heading
            fontSize="sm"
            fontWeight="500"
            textTransform="uppercase"
            lineHeight="0"
          >
            {title}
          </Heading>
        }
        rightIcon={rightIcon}
        leftIcon={
          <CartButton onClick={handleCartClick} quantity={products.length} />
        }
        sideNavHeader={renderHeader()}
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    ),
    lg: (
      <SideNav
        isTransparent
        isClosed={isClosed}
        onClosedToggle={setIsClosed}
        header={renderHeader(isClosed)}
        topMenu={topMenu}
        bottomMenu={authBottomMenu}
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

  if (!store) {
    return <PageLoaderSpinner />
  }

  return (
    <Flex direction={{ base: "column", lg: "row" }}>
      {renderAppBar}
      <Box
        id="mainWrapper"
        height={{ base: "initial", lg: "100vh" }}
        overflow="auto"
        width="100%"
      >
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
