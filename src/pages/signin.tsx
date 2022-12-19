import { Trans, useTranslation } from "react-i18next"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
import { useRouter } from "next/router"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import AuthLayout from "@/layouts/AuthLayout"
import Link from "@/components/Link"

interface SigninProps {
  providers: {
    google: any
  }
}

interface SignInData {
  email: string
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
  const router = useRouter()
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const signinValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail")!)
      .required(t("requiredMessage")!),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signinValidationSchema),
  })

  const handleSubmitCallback = (data: SignInData) => {
    setIsLoadingEmail(true)
    signIn("email", {
      email: data.email,
      callbackUrl: "/app/profile",
    })
  }

  return (
    <AuthLayout>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        {t("signin")}
      </Heading>
      {router.query.error === "OAuthCallback" ||
        (router.query.error === "OAuthAccountNotLinked" && (
          <Alert status="error" borderRadius="md" marginBottom={5}>
            <AlertIcon />
            <AlertDescription>
              Você já utilizou este email, entre abaixo.
            </AlertDescription>
          </Alert>
        ))}
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <FormControl
          isInvalid={Boolean(errors.email?.message)}
          marginBottom={4}
        >
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input placeholder="example@domain.com" {...register("email")} />
          <FormErrorMessage fontSize="xs">
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoadingEmail}
          width="full"
          marginBottom={7}
          type="submit"
          colorScheme="brand"
        >
          {`${t("signin")} `}
        </Button>
      </form>
      <Flex align="center" gap="20px" marginBottom={7}>
        <Box flex="1" height="0.5px" background="gray.300" />
        <Text color="gray.300">or</Text>
        <Box flex="1" height="0.5px" background="gray.300" />
      </Flex>
      <Button
        variant="outline"
        leftIcon={<FcGoogle />}
        width="full"
        isLoading={isLoadingGoogle}
        onClick={() => {
          setIsLoadingGoogle(true)
          signIn(providers.google.id, { callbackUrl: "/app/profile" })
        }}
      >
        {`${t("signinGoogle")} `}
      </Button>
    </AuthLayout>
  )
}

export default Signin
