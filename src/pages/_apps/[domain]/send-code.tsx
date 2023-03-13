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
import api from "@/lib/infra/axios/api"
import useBottomToast from "@/lib/hooks/useBottomToast"

const MaskedWhatsappInput = IMaskMixin(({ inputRef, ...props }: any) => (
  <Input {...props} ref={inputRef} />
))

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
  const toast = useBottomToast()

  const { setState, mutateState, state } = useAppContext()
  const {
    store,
    user: { name, phone, orders, addresses },
  } = state

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      code: "",
    },
  })

  const handleSendCode = async (data: any) => {
    try {
      setIsLoading(true)

      const response = await api.post("/api/auth/verify-code", {
        name,
        phone,
        orders,
        addresses,
        subdomain: store.subdomain,
        code: data.code,
      })

      mutateState({
        ...state,
        user: {
          ...state.user,
          id: response.data.user.id,
          orders: response.data.user.orders,
          addresses: response.data.user.addresses,
          token: response.data.token,
        },
      })

      router.push("/edit-user")
    } catch (error: any) {
      toast({
        title: "Atenção",
        description: "Código inválido",
        status: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppLayout
      title="Código de verificação"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleSendCode)}>
        <Flex
          direction="column"
          shadow="sm"
          backgroundColor="white"
          borderRadius="md"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
        >
          <Alert mb={4} borderRadius="md">
            <AlertIcon />
            Em instantes você receberá um código por SMS.
          </Alert>
          <FormControl>
            <FormLabel>{t("code")}</FormLabel>
            <MaskedWhatsappInput
              value={String(watch("code"))}
              mask="0000"
              placeholder="0000"
              onAccept={(value: string) => setValue("code", value)}
              type="tel"
              required
            />
          </FormControl>
        </Flex>
        <Flex
          gap={4}
          mt={{ base: 0, md: 4 }}
          p={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <Button colorScheme="brand" type="submit" isLoading={isLoading}>
            Enviar código
          </Button>
          <Button type="button" onClick={() => router.push(String(redirect))}>
            Alterar telefone
          </Button>
        </Flex>
      </form>
    </AppLayout>
  )
}

export default CreateAccount
