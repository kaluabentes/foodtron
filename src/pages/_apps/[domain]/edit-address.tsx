import React, { useEffect, useState } from "react"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

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
  const store = await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
    include: {
      deliveryLocations: true,
    },
  })

  return {
    props: {
      locations: store?.deliveryLocations.map((location) => ({
        ...location,
        tax: location.tax.toFixed(2),
      })),
    },
  }
}

interface EditAddressProps {
  locations: Location[]
}

const EditAddress = ({ locations }: EditAddressProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { redirect } = router.query

  const {
    setState,
    state: {
      address: { street, number, location },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      street: street,
      number: number,
      location: location.id,
    },
  })

  const handleEditAddress = (data: any) => {
    setIsLoading(true)
    setState({
      address: {
        street: data.street,
        number: data.number,
        location: locations.find((location) => location.id === data.location),
      },
    })

    if (redirect) {
      router.push(String(redirect))
      return
    }

    router.push("/")
  }

  useEffect(() => {
    if (location.neighborhood) {
      setValue("location", location.id)
    }
  }, [location])

  return (
    <AppLayout
      title="Editar endereço"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push(redirect ? String(redirect) : "/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Flex
        direction="column"
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="hidden"
        marginBottom={8}
        p={5}
      >
        <form onSubmit={handleSubmit(handleEditAddress)}>
          <FormControl mb={5}>
            <FormLabel>{t("street")}</FormLabel>
            <Input {...register("street")} />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>{t("number")}</FormLabel>
            <Input {...register("number")} />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>{t("district")}</FormLabel>
            <Select {...register("location")}>
              <option value="">Selecione</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.neighborhood}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            width="full"
            colorScheme="brand"
            isLoading={isLoading}
          >
            {redirect === "/payment" ? "Forma de pagamento" : "Salvar"}
          </Button>
        </form>
      </Flex>
    </AppLayout>
  )
}

export default EditAddress
