import { Trans, useTranslation } from "react-i18next"
import {
  Box,
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
import { FcGoogle } from "react-icons/fc"

import AuthLayout from "@/layouts/AuthLayout"
import Link from "@/components/Link"

interface SigninProps {
  providers: {
    google: any
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

const Signin = ({ providers }: SigninProps) => {
  const { t } = useTranslation()

  const signinValidationSchema = Yup.object({
    email: Yup.string().email().required(t("requiredMessage")!),
    password: Yup.string().required(t("requiredMessage")!),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: () => {},
  })

  return (
    <AuthLayout>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        {t("signin")}
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={
            Boolean(formik.errors.email) && Boolean(formik.touched.email)
          }
          marginBottom={4}
        >
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FormErrorMessage fontSize="xs">
            {formik.errors.email}
          </FormErrorMessage>
        </FormControl>
        <Button variant="brand" width="full" type="submit" marginBottom={5}>
          {`${t("signin")} `}
        </Button>
      </form>
      <Flex align="center" gap="20px" marginBottom={5}>
        <Box flex="1" height="0.5px" background="gray.300" />
        <Text color="gray.300">or</Text>
        <Box flex="1" height="0.5px" background="gray.300" />
      </Flex>
      <Button
        variant="outline"
        leftIcon={<FcGoogle />}
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

export default Signin
