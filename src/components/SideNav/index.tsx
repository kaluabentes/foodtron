import { Flex, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Menu from "@/components/Menu"
import MenuItem from "@/components/Menu/MenuItem"

import MenuToggleButton from "./MenuToggleButton"
import Brand from "@/components/Brand"
import { ReactNode, useState } from "react"
import { RouteItem } from "@/config/adminMenu"

interface SideNavProps {
  header: ReactNode
  bottomMenu: RouteItem[]
  topMenu: RouteItem[]
  isClosed: boolean
  onClosedToggle: (state: boolean) => void
}

const SideNav = ({
  header,
  bottomMenu,
  topMenu,
  isClosed,
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
      backgroundColor="white"
      shadow="md"
      height="100vh"
      transition="0.5s"
      position="relative"
      onMouseOver={() => onClosedToggle(false)}
      onMouseLeave={() => onClosedToggle(true)}
      overflowX="hidden"
    >
      {header}
      <Flex direction="column" flexGrow={1} justifyContent="space-between">
        <Menu>
          {topMenu.map((item, index) => (
            <MenuItem
              key={String(index + 1)}
              onClick={() =>
                item.onClick ? item.onClick() : router.push(item.path)
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
              key={String(index + 1)}
              onClick={() =>
                item.onClick ? item.onClick() : router.push(item.path)
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
