import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BiDish, BiTask, BiUser } from "react-icons/bi"
import { FaClipboardList, FaConciergeBell, FaUser } from "react-icons/fa"
import { IconType } from "react-icons/lib"

interface ShortcutProps {
  icon: IconType
  path: string
  label: string
}

const Shortcut = ({ icon, path, label }: ShortcutProps) => {
  const router = useRouter()
  const isActive = path === router.asPath
  const isPageLoaded = useIsPageLoaded()

  if (!isPageLoaded) {
    return null
  }

  return (
    <Flex
      as="button"
      direction="column"
      alignItems="center"
      flex={1}
      p={3}
      gap="2px"
      color={isActive ? "brand.500" : "gray.500"}
      onClick={() => router.push(path)}
    >
      <Icon as={icon} fontSize="28px" />
      <Text fontSize="12px">{label}</Text>
    </Flex>
  )
}

const ShortcutDeck = () => {
  useEffect(() => {
    const bodyElement: HTMLBodyElement =
      document.getElementsByTagName("body")[0]
    bodyElement.style.paddingBottom = "72px"

    return () => {
      bodyElement.style.paddingBottom = "0px"
    }
  }, [])

  return (
    <Flex
      shadow="lg"
      backgroundColor="white"
      position="fixed"
      bottom="0"
      width="100%"
    >
      <Shortcut path="/" label="Menu" icon={BiDish} />
      <Shortcut path="/orders" label="Pedidos" icon={BiTask} />
      <Shortcut path="/profile" label="Perfil" icon={BiUser} />
    </Flex>
  )
}

export default ShortcutDeck
