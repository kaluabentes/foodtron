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
import { ORDER_STATUS } from "@/modules/orders/constants"

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
    user: { token, orders },
  } = state
  const toast = useBottomToast()
  const restOrders = orders
    .filter(
      (order) =>
        ![ORDER_STATUS.CANCELLED, ORDER_STATUS.DONE].includes(order.status)
    )
    .reverse()

  const { store } = useGetStore(String(router.query.domain))

  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(true)

  const commonBottomMenu = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
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
              user: {
                id: "",
                name: "",
                phone: "",
                email: "",
                token: "",
                orders: [],
                addresses: [],
                selectedAddressId: "",
              },
            })
          },
        },
      ]
    : [...bottomMenu, ...commonBottomMenu]

  const getMobilePaddingBottom = () => {
    if (router.asPath.includes("/track-order")) {
      return "88px"
    }

    return "125px"
  }

  const handleCartClick = () => {
    if (!products.length) {
      toast({
        title: "Atenção",
        description: "Adicione um produto",
        status: "error",
      })
      return
    }

    router.push("/order-confirm")
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
        mt={4}
      >
        <Heading size="lg" fontWeight="500" color="gray.700">
          {title}
        </Heading>
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
          paddingBottom={{ base: getMobilePaddingBottom(), lg: 8 }}
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
      {restOrders.length > 0 && !router.asPath.includes("/track-order") && (
        <Flex
          position="fixed"
          background="white"
          p={4}
          pt={5}
          pb={5}
          borderRadius={{ base: undefined, lg: "md" }}
          bottom={{ base: "72px", lg: 4 }}
          right={{ base: "0", lg: 8 }}
          width={{ base: "full", lg: "initial" }}
          boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05);"
          alignItems="center"
          gap={4}
          lineHeight="0px"
          zIndex="100"
          onClick={() => router.push(`/track-order?id=${restOrders[0].id}`)}
          as="button"
          overflow="hidden"
          borderBottom="1px solid gray"
          borderColor="gray.100"
          fontWeight="500"
        >
          <Box
            position="absolute"
            height="100%"
            width="5px"
            background="brand.500"
            top="0"
            left="0"
            zIndex="10"
          />
          <Box
            width="12px"
            height="12px"
            borderRadius="50%"
            background="orange"
            color="white"
            alignItems="center"
            animation="pulse 2s infinite"
            justifyContent="center"
          />
          Acompanhar pedido
        </Flex>
      )}
    </Flex>
  )
}

export default AppLayout
