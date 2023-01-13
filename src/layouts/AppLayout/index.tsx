import { ReactNode, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import { BiCart, BiChevronDown, BiMap } from "react-icons/bi"
import BarIconButton from "@/components/BarIconButton"

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AppBar
        title={
          <Heading fontSize="md" fontWeight="500">
            Menu
          </Heading>
        }
        leftIcon={<BarIconButton label="Menu" icon={<BiCart />} />}
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      {children}
      <ShortcutDeck />
    </>
  )
}

export default AppLayout
