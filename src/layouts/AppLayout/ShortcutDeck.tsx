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

const ShortcutDeck = () => (
  <Flex
    shadow="lg"
    backgroundColor="white"
    position="fixed"
    bottom="0"
    boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05);"
    width="100%"
    zIndex="100"
  >
    <Flex
      maxWidth={{ base: "100%", md: "container.md" }}
      width="100%"
      margin="0 auto"
    >
      <Shortcut path="/" label="Menu" icon={BiDish} />
      <Shortcut path="/orders" label="Pedidos" icon={BiTask} />
      <Shortcut path="/profile" label="Perfil" icon={BiUser} />
    </Flex>
  </Flex>
)

export default ShortcutDeck
