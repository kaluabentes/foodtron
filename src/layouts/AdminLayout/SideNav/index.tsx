import { Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Menu from "@/components/Menu"
import MenuItem from "@/components/Menu/MenuItem"
import { bottomMenu, topMenu } from "@/config/appMenu"

import MenuToggleButton from "./MenuToggleButton"
import Brand from "@/components/Brand"

interface SideNavProps {
  isClosed?: boolean
  onToggle: () => void
}

const SideNav = ({ isClosed = false, onToggle }: SideNavProps) => {
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
      shadow="sm"
      height="100vh"
      transition="0.5s"
      position="relative"
    >
      <MenuToggleButton onClick={onToggle} />
      <Brand logo="/comet-blue.svg" storeName="Comet" blue />
      <Flex direction="column" flexGrow={1} justifyContent="space-between">
        <Menu>
          {topMenu.map((item, index) => (
            <MenuItem
              key={String(index + 1)}
              onClick={() =>
                item.onClick ? item.onClick() : router.push(item.path)
              }
              icon={item.icon}
              isActive={router.asPath.includes(item.path)}
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
              isActive={router.asPath.includes(item.path)}
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
