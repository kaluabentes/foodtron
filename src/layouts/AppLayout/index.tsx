import { ReactNode, useState } from "react"

import AppBar from "@/components/AppBar"
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import ShortcutDeck from "./ShortcutDeck"
import { BiCart, BiChevronDown, BiMap } from "react-icons/bi"
import BarIconButton from "@/components/BarIconButton"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  rightIcon?: ReactNode
}

const AppLayout = ({ children, title, rightIcon }: AppLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AppBar
        title={
          <Heading fontSize="md" fontWeight="500">
            {title}
          </Heading>
        }
        rightIcon={rightIcon}
        leftIcon={<BarIconButton label="Carrinho" icon={<BiCart />} />}
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <Box as="main" marginTop={{ base: "60px", lg: "0" }} marginBottom="72px">
        {children}
      </Box>
      <ShortcutDeck />
    </>
  )
}

export default AppLayout
