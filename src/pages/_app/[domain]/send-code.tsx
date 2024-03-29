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
  Text,
} from "@chakra-ui/react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { IMaskMixin } from "react-imask"

import prisma from "@/lib/providers/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import ResponsiveButton from "@/components/ResponsiveButton"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { signIn, useSession } from "next-auth/react"
import api from "@/lib/providers/axios/api"
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
    user: { name, phone, orders, addresses, selectedAddressId },
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

      const {
        data: { token, user },
      } = await api.post("/api/auth/verify-code", {
        name,
        phone,
        orders,
        addresses,
        selectedAddressId,
        subdomain: store.subdomain,
        code: data.code,
      })

      mutateState({
        ...state,
        user: {
          ...user,
          token,
        },
      })

      router.push("/profile")

      toast({
        title: "Feito!",
        description: "Login feito com sucesso",
        status: "success",
      })
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
      leftIcon={
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
          p={{ base: 4, md: 5 }}
        >
          <Text mb={4}>Em instantes você receberá um código por SMS.</Text>
          <FormControl>
            <FormLabel>Insira o código</FormLabel>
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
