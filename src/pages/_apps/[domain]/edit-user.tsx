import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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

const EditUser = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { redirect } = router.query

  const {
    setState,
    state: {
      user: { name, phone },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name,
      phone,
    },
  })

  const handleEditUser = (data: any) => {
    setIsLoading(true)
    setState({
      user: {
        name: data.name,
        phone: data.phone,
      },
    })

    if (redirect) {
      router.push(String(redirect))
      return
    }

    router.push("/order")
  }

  useEffect(() => {
    if (name) {
      setValue("name", name)
    }

    if (phone) {
      setValue("phone", phone)
    }
  }, [name, phone])

  return (
    <AppLayout
      hideCartButton
      title="Contato"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleEditUser)}>
        <Flex
          direction="column"
          shadow="sm"
          backgroundColor="white"
          borderRadius="md"
          overflow="hidden"
          p={4}
        >
          <FormControl mb={5}>
            <FormLabel>{t("name")}</FormLabel>
            <Input {...register("name")} required />
          </FormControl>
          <FormControl mb={5}>
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
        <Box p={4}>
          <Button
            type="submit"
            width="full"
            colorScheme="brand"
            isLoading={isLoading}
          >
            Salvar
          </Button>
        </Box>
      </form>
    </AppLayout>
  )
}

export default EditUser
