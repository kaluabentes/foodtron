import { Flex, Heading, Image } from "@chakra-ui/react"
import { BiBell, BiMenu } from "react-icons/bi"

import BarIconButton from "@/components/BarIconButton"

import SideNav from "./SideNav"
import { ReactElement, ReactNode, useEffect } from "react"

interface AppBarProps {
  title?: ReactNode
  isOpen: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  onMenuClick: () => void
  onClose: () => void
}

const AppBar = ({
  title,
  isOpen,
  rightIcon,
  leftIcon,
  onMenuClick,
  onClose,
}: AppBarProps) => (
  <>
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      background="white"
      height="60px"
      width="100%"
      zIndex="100"
      shadow="lg"
      borderBottom="1px solid transparent"
      borderColor="gray.200"
      top="0"
      left="0"
      pl={2}
      pr={2}
    >
      {rightIcon ? (
        rightIcon
      ) : (
        <BarIconButton onClick={onMenuClick} label="Menu" icon={<BiMenu />} />
      )}
      {title ? (
        title
      ) : (
        <Flex alignItems="center" gap="10px">
          <Image src="/comet-blue.svg" alt="Comet" width="30px" />
          <Heading
            fontSize="2xl"
            fontWeight="700"
            overflow="hidden"
            color="brand.500"
            whiteSpace="nowrap"
          >
            Comet
          </Heading>
        </Flex>
      )}
      {leftIcon}
    </Flex>
    <SideNav isOpen={isOpen} onClose={onClose} />
  </>
)

export default AppBar
