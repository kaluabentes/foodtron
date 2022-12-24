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
import { getProviders, getSession, signIn, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from "axios"

import AuthLayout from "@/layouts/AuthLayout"
import prisma from "@/lib/prisma"

interface SignInData {
  storeName: string
  userName: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getSession(context)
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  })

  if (user?.storeId) {
    return {
      redirect: {
        destination: "/app/profile",
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers,
    },
  }
}

const CompleteSignin = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)

  const signinValidationSchema = Yup.object({
    storeName: Yup.string().required(t("requiredMessage")!),
    userName: Yup.string().required(t("requiredMessage")!),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signinValidationSchema),
    defaultValues: {
      userName: session?.user?.name || "",
    },
  })

  const handleSubmitCallback = async (data: SignInData) => {
    setIsLoadingEmail(true)

    try {
      await axios.post("/api/auth/complete-signin", {
        storeName: data.storeName,
        userName: data.userName,
      })

      setTimeout(() => {
        router.push("/app/profile")
      }, 3000)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <AuthLayout>
      <Heading size="lg" marginBottom={5} fontWeight="semibold">
        {t("completeSignin")}
      </Heading>
      <Text mb={10}>Para continuar complete o seu cadastro abaixo</Text>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <FormControl
          isInvalid={Boolean(errors.userName?.message)}
          marginBottom={4}
        >
          <FormLabel htmlFor="userName">{t("userName")}</FormLabel>
          <Input
            id="userName"
            placeholder="Seu José"
            {...register("userName")}
          />
          <FormErrorMessage fontSize="xs">
            {errors.userName?.message}
          </FormErrorMessage>
        </FormControl>
        <Heading size="sm" marginBottom={5}>
          {t("storeInformation")}
        </Heading>
        <FormControl
          isInvalid={Boolean(errors.storeName?.message)}
          marginBottom={4}
        >
          <FormLabel htmlFor="storeName">{t("storeName")}</FormLabel>
          <Input
            id="storeName"
            placeholder="Padaria do Seu José"
            {...register("storeName")}
          />
          <FormErrorMessage fontSize="xs">
            {errors.storeName?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoadingEmail}
          width="full"
          type="submit"
          colorScheme="brand"
        >
          {`${t("continue")} `}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default CompleteSignin
