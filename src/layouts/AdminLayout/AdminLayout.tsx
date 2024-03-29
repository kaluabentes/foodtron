import {
  Box,
  Container,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"
import { configureAbly, useChannel } from "@ably-labs/react-hooks"

import { bottomMenu, topMenu } from "@/config/adminMenu"
import { ORDER_STATUS } from "@/modules/admin/orders/constants"
import { useAppContext } from "@/contexts/app"
import AppBar from "@/components/AppBar"
import BellButton from "@/components/BellButton"
import Brand from "@/components/Brand"
import Order from "@/modules/admin/orders/types/Order"
import OrderNotificationModal from "@/modules/admin/orders/components/OrderNotificationModal"
import playNotificationSound from "@/modules/admin/orders/lib/playNotificationSound"
import useBottomToast from "@/lib/hooks/useBottomToast"
import useGetOrders from "@/modules/admin/orders/hooks/useGetOrders"

import SideNav from "../../components/SideNav"
import BellButtonLarge from "@/components/BellButtonLarge"
import useUser from "@/modules/admin/auth/hooks/useUser"
import createChannel from "@/lib/providers/ably/createChannel"
import { once } from "lodash"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import useUpdateStore from "@/modules/admin/stores/hooks/useUpdateStore"

interface AdminLayoutProps {
  children: ReactNode
  isFullWidth?: boolean
  hasPadding?: boolean
  isActionButtonLoading?: boolean
  onActionClick?: () => void
}

configureAbly(process.env.NEXT_PUBLIC_ABLY_SUBSCRIBE_KEY!)

const getCurrentSchedule = () => {
  const date = new Date()
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padEnd(2, "0")}`
}

const getTodaySchedule = (schedules: Schedule[]) => {
  const currentDay = new Date().getDay()
  const todaySchedule = schedules.find(
    (schedule) => schedule.weekDay === String(currentDay)
  )

  return todaySchedule
}

const AdminLayout = ({
  children,
  isFullWidth = false,
  hasPadding = true,
}: AdminLayoutProps) => {
  const { status } = useSession()
  const router = useRouter()
  const toast = useBottomToast()

  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(true)
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false)

  const { orders, getOrders } = useGetOrders()
  const { updateStore } = useUpdateStore()
  const { user } = useUser()

  const newOrders = orders
    ? orders.filter((order: Order) => order.status === ORDER_STATUS.PENDING)
    : []

  const executeChannelOnce = once(async () => {
    getOrders()
    await playNotificationSound()
    toast({
      title: "Oba!",
      description: "Você recebeu um novo pedido",
      status: "info",
    })
  })

  const closeStore = once(async () => {
    await updateStore({ isOpen: false })
  })

  useEffect(() => {
    if (user) {
      const subscribeToAbly = async () => {
        const channel = await createChannel(user?.store?.subdomain)
        channel.subscribe("newOrder", async () => {
          if (router.asPath !== "/admin/orders") {
            executeChannelOnce()
          }
        })
      }

      subscribeToAbly()
    }
  }, [user])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        const currentSchedule = getCurrentSchedule()
        const schedule = getTodaySchedule(user.store.schedules)
        const todaySchedule = schedule?.end
        const isScheduledClosing = schedule?.isScheduledClosing

        if (currentSchedule === todaySchedule && isScheduledClosing) {
          closeStore()
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [user])

  const renderNavigation = useBreakpointValue({
    base: (
      <AppBar
        isFixed
        isOpen={isOpen}
        topMenu={topMenu}
        bottomMenu={bottomMenu}
        rightIcon={
          <BellButton
            count={newOrders.length}
            onClick={() => setIsOrdersModalOpen(true)}
          />
        }
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    ),
    lg: (
      <SideNav
        isClosed={isClosed}
        onClosedToggle={setIsClosed}
        topMenu={topMenu}
        bottomMenu={bottomMenu}
        header={
          <Brand
            logo="/comet-blue.svg"
            storeName={<Image height="12px" src="/comet-text.svg" />}
            hideBrandText={isClosed}
          />
        }
      />
    ),
  })

  const renderBellButtonLarge = useBreakpointValue({
    base: null,
    lg: (
      <BellButtonLarge
        count={newOrders.length}
        onClick={() => setIsOrdersModalOpen(true)}
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
          pt={{ base: "60px", lg: 0 }}
        >
          {children}
        </Container>
      </Box>
      <OrderNotificationModal
        isOpen={isOrdersModalOpen}
        orders={newOrders}
        onClose={() => setIsOrdersModalOpen(false)}
        onOrderClick={(order: Order) => {
          setIsOrdersModalOpen(false)
          router.push(`/admin/orders?id=${order.id}`)
        }}
      />
      {renderBellButtonLarge}
    </Flex>
  )
}

export default AdminLayout
