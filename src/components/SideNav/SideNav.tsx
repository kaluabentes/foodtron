import { Flex, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Menu from "@/components/Menu"
import MenuItem from "@/components/Menu/MenuItem"

import MenuToggleButton from "./MenuToggleButton"
import Brand from "@/components/Brand"
import { ReactNode, useState } from "react"
import RouteItem from "@/types/RouteItem"

interface SideNavProps {
  header: ReactNode
  bottomMenu: RouteItem[]
  topMenu: RouteItem[]
  isClosed: boolean
  isTransparent?: boolean
  onClosedToggle?: (state: boolean) => void
}

const SideNav = ({
  header,
  bottomMenu,
  topMenu,
  isClosed,
  isTransparent = false,
  onClosedToggle,
}: SideNavProps) => {
  const router = useRouter()

  return (
    <Flex
      as="nav"
      direction="column"
      flexGrow="1"
      width="100%"
      maxWidth={isClosed ? "68px" : "220px"}
      padding={3}
      paddingTop={5}
      backgroundColor={isTransparent ? undefined : "white"}
      shadow={isTransparent ? undefined : "md"}
      height="100vh"
      transition="0.5s"
      position="relative"
      onMouseOver={() => onClosedToggle && onClosedToggle(false)}
      onMouseLeave={() => onClosedToggle && onClosedToggle(true)}
      overflowX="hidden"
      zIndex="1000"
    >
      {header}
      <Flex direction="column" flexGrow={1} justifyContent="space-between">
        <Menu>
          {topMenu.map((item, index) => (
            <MenuItem
              isTransparent
              key={String(index + 1)}
              onClick={() =>
                item.onClick ? item.onClick() : router.push(item.path!)
              }
              icon={item.icon}
              isActive={item.path === router.asPath}
              isClosed={isClosed}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
        <Menu>
          {bottomMenu.map((item, index) => (
            <MenuItem
              isTransparent
              key={String(index + 1)}
              onClick={() =>
                item.onClick ? item.onClick() : router.push(item.path!)
              }
              icon={item.icon}
              isActive={item.path === router.asPath}
              isClosed={isClosed}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Flex>
    </Flex>
  )
}

export default SideNav
