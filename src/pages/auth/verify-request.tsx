import { useTranslation } from "react-i18next"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"

import AuthLayout from "@/layouts/AuthLayout"
import { useRouter } from "next/router"

const VerifyRequest = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Flex
        as="a"
        href="https://foodtron.app"
        target="_blank"
        rel="noopener noreferrer"
        justifyContent="center"
      >
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
      </Flex>
      <Heading textAlign="center" size="lg" mb={4} fontWeight="semibold">
        Link mágico enviado
      </Heading>
      <Text mb={4} color="gray.600" textAlign="center">
        Verifique seu email enviamos um link mágico, use-o para conectar ou
        criar sua conta.
      </Text>
      <Button onClick={() => router.push("/")} width="full" colorScheme="brand">
        Voltar para página inicial
      </Button>
    </AuthLayout>
  )
}

export default VerifyRequest
