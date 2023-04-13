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

import prisma from "@/lib/providers/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import ResponsiveButton from "@/components/ResponsiveButton"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { signIn, useSession } from "next-auth/react"
import sendVerification from "@/lib/providers/sinch/sendVerification"
import api from "@/lib/providers/axios/api"
import formatPhone from "@/lib/helpers/string/formatPhone"

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

  const {
    setState,
    state: {
      user: { phone, name },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isSMSSent, setIsSMSSent] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      phone,
      name,
    },
  })

  const handleCreateAccount = async (data: any) => {
    const phone = formatPhone(data.phone)

    setIsLoading(true)
    setState({
      user: {
        phone,
        name: data.name,
      },
    })

    await api.post("/api/auth/send-verification", {
      phone,
    })

    router.push("/send-code?redirect=/create-account")
  }

  useEffect(() => {
    setValue("phone", phone)
  }, [phone])

  useEffect(() => {
    setValue("name", name)
  }, [name])

  return (
    <AppLayout
      title="Criar conta"
      leftIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleCreateAccount)}>
        <Flex
          direction="column"
          shadow="sm"
          backgroundColor="white"
          borderRadius="md"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
        >
          <FormControl mb={4}>
            <FormLabel>{t("name")}</FormLabel>
            <Input {...register("name")} required />
          </FormControl>
          <FormControl>
            <FormLabel>{t("phone")}</FormLabel>
            <MaskedWhatsappInput
              value={String(watch("phone"))}
              mask="(00) 0 0000 0000"
              placeholder="(00) 0 0000 0000"
              onAccept={(value: string) => setValue("phone", value)}
              type="tel"
              required
            />
          </FormControl>
        </Flex>
        <ResponsiveButton type="submit" isLoading={isLoading}>
          Criar conta
        </ResponsiveButton>
      </form>
    </AppLayout>
  )
}

export default CreateAccount
