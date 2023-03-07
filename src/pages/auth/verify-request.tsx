import { useTranslation } from "react-i18next"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"

import AuthLayout from "@/layouts/AuthLayout"

const VerifyRequest = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Flex
        as="a"
        href="https://gocomet.app"
        target="_blank"
        rel="noopener noreferrer"
        justifyContent="center"
      >
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
      </Flex>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        Link mágico enviado
      </Heading>
      <Text></Text>
      <Alert status="success" borderRadius="md" alignItems="start">
        <AlertIcon />
        <AlertDescription>
          Verifique seu email enviamos um link mágico, use-o para conectar a sua
          conta.
        </AlertDescription>
      </Alert>
    </AuthLayout>
  )
}

export default VerifyRequest
