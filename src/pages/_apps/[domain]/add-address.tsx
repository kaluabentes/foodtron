import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import AddressParam from "@/modules/app/addresses/types/AddressParam"
import api from "@/lib/infra/axios/api"
import useBottomToast from "@/lib/hooks/useBottomToast"
import getCoordinates from "@/lib/infra/browser/getCoordinates"

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
  const toast = useBottomToast()

  const {
    setState,
    state: {
      user: { addresses, token },
    },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      street: "",
      number: "",
      location: "",
      currentLocation: false,
    },
  })

  const handleAddAddress = async (data: any) => {
    try {
      const id = uuidv4()
      const address: AddressParam = {
        id,
        street: data.street,
        number: data.number,
        location: locations.find((location) => location.id === data.location)!,
      }

      let mergedAddresses = [...addresses, address]

      setIsLoading(true)

      if (data.currentLocation) {
        const { latitude, longitude } = await getCoordinates()

        if (latitude) {
          address.latitude = latitude
          address.longitude = longitude
        }
      }

      if (token) {
        const response = await api.post("/api/addresses", address, {
          headers: {
            Authorization: token,
          },
        })
        mergedAddresses = [...addresses, response.data]
      }

      setState({
        user: {
          addresses: mergedAddresses,
        },
      })

      router.push("/addresses")

      toast({
        title: "Feito!",
        description: "O endereço foi criado com sucesso",
        status: "success",
      })
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        status: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppLayout
      title="Adicionar endereço"
      leftIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/addresses")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleAddAddress)}>
        <Flex
          direction="column"
          shadow="sm"
          backgroundColor="white"
          borderRadius="md"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
          mt={{ base: 0, md: 4 }}
        >
          <FormControl mb={5}>
            <FormLabel>{t("street")}</FormLabel>
            <Input {...register("street")} required />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>{t("number")}</FormLabel>
            <Input {...register("number")} type="tel" required />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>{t("district")}</FormLabel>
            <Select {...register("location")} required>
              <option value="">Selecione</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.neighborhood}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Mandar localização atual?</FormLabel>
            Não <Switch {...register("currentLocation")} type="tel" /> Sim
          </FormControl>
        </Flex>
        <Flex
          gap={4}
          mt={{ base: 0, md: 4 }}
          p={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <Button colorScheme="brand" type="submit" isLoading={isLoading}>
            Adicionar
          </Button>
        </Flex>
      </form>
    </AppLayout>
  )
}

export default EditAddress
