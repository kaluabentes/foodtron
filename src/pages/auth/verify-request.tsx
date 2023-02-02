import { useTranslation } from "react-i18next"
import { Flex, Heading, Image, Text } from "@chakra-ui/react"

import AuthLayout from "@/layouts/AuthLayout"

const VerifyRequest = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Flex justifyContent="center">
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
      </Flex>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        Link mágico enviado
      </Heading>
      <Text>Verifique seu email</Text>
    </AuthLayout>
  )
}

export default VerifyRequest
