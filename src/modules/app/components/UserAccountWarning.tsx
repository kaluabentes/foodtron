import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react"

const UserAccountWarning = () => (
  <Flex direction="column" gap={4} mb={4}>
    <Alert fontWeight="500" fontSize="xs" borderRadius="md" shadow="sm">
      <AlertIcon />
      Você ainda não possui uma conta criada, portanto, suas informações ficaram
      armazenadas localmente, para salvar as suas informações na nuvem crie uma
      conta abaixo
    </Alert>
    <Button variant="outline" width="full">
      Criar conta
    </Button>
  </Flex>
)

export default UserAccountWarning
