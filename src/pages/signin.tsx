import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { getProviders, signIn } from "next-auth/react"
import { GetServerSideProps } from "next"

import AuthLayout from "@/layouts/AuthLayout"
import Link from "@/components/Link"

interface SigninProps {
  providers: {
    google: any
  }
}

const Signin = ({ providers }: SigninProps) => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        {t("signin")}
        {providers.google.id}
      </Heading>
      <Button
        variant="brand"
        width="full"
        type="submit"
        onClick={() =>
          signIn(providers.google.id, { callbackUrl: "/app/profile" })
        }
      >
        {`${t("signinGoogle")} `}
      </Button>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Signin
