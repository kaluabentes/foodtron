import { Alert, AlertIcon, Button, CloseButton, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

const UserAccountWarning = () => {
  const router = useRouter()

  return (
    <Flex
      direction="column"
      gap={4}
      mb={{ base: 0, md: 4 }}
      p={{ base: 4, md: 5 }}
      background="white"
      borderRadius="md"
      shadow="sm"
      position="relative"
    >
      <Alert fontWeight="500" fontSize="xs" borderRadius="md" shadow="sm">
        <AlertIcon />
        Você ainda não está logado em uma conta, portanto, suas informações
        ficaram armazenadas localmente, para salvar as suas informações na nuvem
        crie ou entre em uma conta.
      </Alert>
      <Flex gap={3}>
        <Button
          colorScheme="brand"
          size="sm"
          onClick={() => router.push("/create-account")}
        >
          Criar conta
        </Button>
        <Button size="sm" onClick={() => router.push("/login")}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default UserAccountWarning
