import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

const UserAccountWarning = () => {
  const router = useRouter()

  return (
    <Flex
      direction="column"
      gap={4}
      p={{ base: 4, md: 0 }}
      pb={{ base: 0, lg: 4 }}
      pt={{ base: 4, md: 4, lg: 0 }}
    >
      <Alert fontWeight="500" fontSize="xs" borderRadius="md" shadow="sm">
        <AlertIcon />
        Você ainda não possui uma conta criada, portanto, suas informações
        ficaram armazenadas localmente, para salvar as suas informações na nuvem
        crie uma conta abaixo
      </Alert>
      <Button
        variant="outline"
        width="full"
        onClick={() => router.push("/create-account")}
      >
        Criar conta
      </Button>
    </Flex>
  )
}

export default UserAccountWarning
