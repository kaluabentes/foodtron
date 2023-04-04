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
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import ResponsiveButton from "@/components/ResponsiveButton"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { signIn, useSession } from "next-auth/react"
import sendVerification from "@/lib/infra/sinch/sendVerification"
import api from "@/lib/infra/axios/api"
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
      user: { phone },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      phone,
    },
  })

  const handleLogin = async (data: any) => {
    const phone = formatPhone(data.phone)

    setIsLoading(true)
    setState({
      user: {
        phone,
      },
    })

    await api.post("/api/auth/send-verification", {
      phone,
    })

    router.push("/send-code?redirect=/login")
  }

  useEffect(() => {
    setValue("phone", phone)
  }, [phone])

  return (
    <AppLayout
      title="Entrar"
      leftIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <Flex
          direction="column"
          shadow="sm"
          backgroundColor="white"
          borderRadius="md"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
        >
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
        <Flex
          gap={4}
          mt={{ base: 0, md: 4 }}
          p={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <Button colorScheme="brand" type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </Flex>
      </form>
    </AppLayout>
  )
}

export default CreateAccount
