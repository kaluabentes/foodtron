import { ReactNode, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import { BiCart, BiChevronDown, BiMap } from "react-icons/bi"
import BarIconButton from "@/components/BarIconButton"
import CartButton from "@/components/CartButton"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  rightIcon?: ReactNode
}

const AppLayout = ({ children, title, rightIcon }: AppLayoutProps) => {
  const router = useRouter()
  const {
    state: {
      order: { products },
    },
  } = useAppContext()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AppBar
        isFixed
        title={
          <Heading fontSize="md" textTransform="uppercase">
            {title}
          </Heading>
        }
        rightIcon={rightIcon}
        leftIcon={
          <CartButton
            onClick={() => router.push("/order")}
            quantity={products.length}
          />
        }
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <Box as="main" paddingBottom="72px" overflow="auto" paddingTop="60px">
        {children}
      </Box>
      <ShortcutDeck />
    </>
  )
}

export default AppLayout
