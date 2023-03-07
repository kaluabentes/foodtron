import React, { useEffect, useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
} from "@chakra-ui/react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { IMaskMixin } from "react-imask"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import ResponsiveButton from "@/components/ResponsiveButton"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { signIn, useSession } from "next-auth/react"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store) => ({
      params: {
        domain: store.subdomain,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  return {
    props: {
      domain: params.domain,
    },
  }
}

const CreateAccount = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { redirect } = router.query

  const {
    setState,
    state: {
      user: { email },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      email,
    },
  })

  const generateCallbackUrl = (env: string) => {
    if (env === "development") {
      console.log(env)
      return `http://${router.query.domain}.localhost:3000/edit-user`
    }

    if (env === "production") {
      return `https://${router.query.domain}.gocomet.app/edit-user`
    }
  }

  const handleCreateAccount = async (data: any) => {
    setIsLoading(true)
    setState({
      user: {
        email: data.email,
      },
    })

    const callbackUrl = generateCallbackUrl(process.env.NODE_ENV)
    const response = await signIn("email", {
      email: data.email,
      callbackUrl,
      redirect: false,
    })

    setIsLoading(false)

    if (response?.ok) {
      setIsEmailSent(true)
    }
  }

  const renderEmailSentMessage = () => (
    <Box
      background="white"
      p={{ base: 4, md: 8 }}
      borderRadius="md"
      shadow="sm"
    >
      <Heading size="md" marginBottom={4} fontWeight="semibold" mt={0}>
        Link mágico enviado para {email}
      </Heading>
      <Alert status="success" borderRadius="md" alignItems="start">
        <AlertIcon />
        <AlertDescription>
          Verifique seu email enviamos um link mágico, use-o para conectar a sua
          conta.
        </AlertDescription>
      </Alert>
    </Box>
  )

  return (
    <AppLayout
      title="Criar conta"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      {isEmailSent ? (
        renderEmailSentMessage()
      ) : (
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <Flex
            direction="column"
            shadow="sm"
            backgroundColor="white"
            borderRadius="md"
            overflow="hidden"
            p={{ base: 4, md: 8 }}
          >
            <FormControl>
              <FormLabel>{t("email")}</FormLabel>
              <Input {...register("email")} required />
            </FormControl>
          </Flex>
          <ResponsiveButton type="submit" isLoading={isLoading}>
            Criar conta
          </ResponsiveButton>
        </form>
      )}
    </AppLayout>
  )
}

export default CreateAccount
