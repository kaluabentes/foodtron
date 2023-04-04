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
import useGetStore from "@/modules/admin/stores/hooks/useGetStore"
import PageLoaderSpinner from "@/components/PageLoaderSpinner"
import { BiLogInCircle, BiPowerOff } from "react-icons/bi"
import { FaWhatsapp } from "react-icons/fa"
import { ORDER_STATUS } from "@/modules/admin/orders/constants"
import TrackOrderButton from "@/modules/app/components/order/TrackOrderButton"
import useGetUser from "@/modules/app/profile/hooks/useGetUser"
import useActiveOrder from "@/modules/app/orders/hooks/useActiveOrder"
import useGetOrders from "@/modules/app/orders/hooks/useGetOrders"
import StoreBrand from "@/components/StoreBrand"
import FoodtronBrand from "@/components/FoodtronBrand"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  leftIcon?: ReactNode
  hideCartButton?: boolean
}

const AppLayout = ({
  children,
  title,
  leftIcon,
  hideCartButton,
}: AppLayoutProps) => {
  const router = useRouter()
  const toast = useBottomToast()

  const { setState, mutateState, state } = useAppContext()
  const {
    isReady,
    order: { products },
    user: { token, orders: localOrders },
  } = state

  const activeOrder = useActiveOrder()

  const { store } = useGetStore(String(router.query.domain))
  const { orders } = useGetOrders(localOrders.map((order) => order.id))

  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(true)

  const commonBottomMenu = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      path: "/admin/settings",
      onClick: () => {
        window.open(`https://wa.me/${store.whatsapp}`, "_blank")
      },
    },
  ]

  const authBottomMenu = token
    ? [
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
        ...bottomMenu,
        ...commonBottomMenu,
      ]
    : [
        {
          icon: BiLogInCircle,
          label: "Entrar",
          path: "/login",
        },
        ...bottomMenu,
        ...commonBottomMenu,
      ]

  const getMobilePaddingBottom = () => {
    if (router.asPath.includes("/track-order")) {
      return "72px"
    }

    if (activeOrder) {
      return "125px"
    }

    return "72px"
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
        store,
      })
    }
  }, [isReady, store])

  useEffect(() => {
    if (isReady && orders) {
      mutateState({
        ...state,
        user: {
          ...state.user,
          orders,
        },
      })
    }
  }, [isReady, orders, token])

  const renderHeader = (isClosed = false) =>
    store && store.logo ? (
      <StoreBrand
        logo={store.logo}
        storeName={store.name}
        hideBrandText={isClosed}
        width="44px"
        height="44px"
      />
    ) : (
      <FoodtronBrand
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
          <Heading fontSize="md" fontWeight="600" lineHeight="0">
            {title}
          </Heading>
        }
        leftIcon={leftIcon}
        rightIcon={
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
        isFixed
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
        <Heading size="lg" fontWeight="600" color="gray.700">
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
      {activeOrder && !router.asPath.includes("/track-order") && (
        <TrackOrderButton
          onClick={() => router.push(`/track-order?id=${activeOrder.id}`)}
        />
      )}
    </Flex>
  )
}

export default AppLayout
