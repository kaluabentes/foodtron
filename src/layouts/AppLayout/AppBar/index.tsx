import { Flex, Heading, Image } from "@chakra-ui/react"
import { BiBell, BiMenu } from "react-icons/bi"
import AppMenu from "./AppMenu"
import BarIconButton from "./BarIconButtom"

interface AppBarProps {
  onMenuClick: () => void
  onNotificationClick: () => void
  onClose: () => void
  isOpen: boolean
}

const AppBar = ({
  onMenuClick,
  onNotificationClick,
  onClose,
  isOpen,
}: AppBarProps) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    background="gray.900"
    height="60px"
    width="100%"
    position="fixed"
    zIndex="100"
    top="0"
    left="0"
    pl={2}
    pr={2}
  >
    <BarIconButton onClick={onMenuClick} label="Menu" icon={<BiMenu />} />
    <Flex alignItems="center" gap="10px">
      <Image src="/comet.svg" alt="Comet" width="30px" />
      <Heading
        size="20px"
        fontWeight="700"
        overflow="hidden"
        color="white"
        whiteSpace="nowrap"
      >
        Comet
      </Heading>
    </Flex>
    <BarIconButton
      onClick={onNotificationClick}
      label="Menu"
      icon={<BiBell />}
    />
    <AppMenu isOpen={isOpen} onClose={onClose} />
  </Flex>
)

export default AppBar
