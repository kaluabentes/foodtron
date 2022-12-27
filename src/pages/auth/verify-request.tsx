import { useTranslation } from "react-i18next"
import { Heading, Text } from "@chakra-ui/react"

import AuthLayout from "@/layouts/AuthLayout"

const VerifyRequest = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        Link mágico enviado
      </Heading>
      <Text>Verifique seu email</Text>
    </AuthLayout>
  )
}

export default VerifyRequest
