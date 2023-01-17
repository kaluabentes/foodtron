import { CloseButton, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Menu from "@/components/Menu"
import MenuItem from "@/components/Menu/MenuItem"
import ClickOutside from "@/components/ClickOutside"
import { topMenu, bottomMenu } from "@/config/appMenu"
import Brand from "@/components/Brand"

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
}

const SideNav = ({ isOpen, onClose }: SideNavProps) => {
  const router = useRouter()

  return (
    <ClickOutside onClickOutside={onClose}>
      <Flex
        as="nav"
        direction="column"
        flexGrow="1"
        width="100%"
        maxWidth="220px"
        padding={3}
        backgroundColor="white"
        height="100%"
        transition="0.3s"
        position="fixed"
        top="0"
        left={isOpen ? "0" : "-220px"}
        visibility={isOpen ? "visible" : "hidden"}
        shadow="md"
        zIndex={100}
      >
        <CloseButton
          onClick={onClose}
          position="absolute"
          top="17px"
          right="-15px"
          backgroundColor="white"
          borderRadius="50%"
          boxShadow="md"
          _hover={{ backgroundColor: "gray.100" }}
          _active={{ backgroundColor: "gray.100" }}
        />
        <Brand logo="/comet-blue.svg" storeName="Comet" blue />
        <Flex direction="column" flexGrow={1} justifyContent="space-between">
          <Menu>
            {topMenu.map((item: any, index) => (
              <MenuItem
                key={String(index + 1)}
                onClick={() =>
                  item.onClick ? item.onClick() : router.push(item.path)
                }
                icon={item.icon}
                isLight
                isActive={router.asPath.includes(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
          <Menu>
            {bottomMenu.map((item: any, index) => (
              <MenuItem
                key={String(index + 1)}
                onClick={() =>
                  item.onClick ? item.onClick() : router.push(item.path)
                }
                icon={item.icon}
                isActive={router.asPath.includes(item.path)}
                isLight
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Flex>
      </Flex>
    </ClickOutside>
  )
}

export default SideNav
