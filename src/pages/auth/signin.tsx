import { useTranslation } from "react-i18next"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { getSession, signIn, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import AuthLayout from "@/layouts/AuthLayout"

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (session?.user) {
    return {
      redirect: {
        destination: "/admin/store",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

interface SignInData {
  email: string
}

const Signin = () => {
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
      callbackUrl: "/auth/complete-signin",
    })
  }

  return (
    <AuthLayout>
      <Flex justifyContent="center">
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
      </Flex>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        {t("signinComet")}
      </Heading>
      {router.query.error === "OAuthCallback" ||
        (router.query.error === "OAuthAccountNotLinked" && (
          <Alert
            status="error"
            borderRadius="md"
            marginBottom={5}
            alignItems="start"
          >
            <AlertIcon />
            <AlertDescription>
              Para logar entre com o seu email abaixo.
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
          signIn("google", { callbackUrl: "/auth/complete-signin" })
        }}
      >
        {`${t("signinGoogle")} `}
      </Button>
    </AuthLayout>
  )
}

export default Signin
