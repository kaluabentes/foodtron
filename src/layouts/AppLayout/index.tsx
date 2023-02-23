import { ReactNode, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import { BiCart, BiChevronDown, BiMap } from "react-icons/bi"
import BarIconButton from "@/components/BarIconButton"
import CartButton from "@/components/CartButton"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import useBottomToast from "@/lib/hooks/useBottomToast"

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
  const toast = useBottomToast()

  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <>
      <AppBar
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
      <Box
        as="main"
        paddingBottom="88px"
        overflow="auto"
        paddingTop={{ base: "60px", md: "76px" }}
        maxWidth={{ base: "100%", md: "container.md" }}
        margin="0 auto"
      >
        {children}
      </Box>
      <ShortcutDeck />
    </>
  )
}

export default AppLayout
