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

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import ResponsiveButton from "@/components/ResponsiveButton"
import Address from "@/modules/app/addresses/types/Address"
import AddressParam from "@/modules/app/addresses/types/AddressParam"
import useBottomToast from "@/lib/hooks/useBottomToast"
import api from "@/lib/infra/axios/api"

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
  const { id } = router.query
  const toast = useBottomToast()

  const {
    setState,
    state: {
      user: { addresses, token },
    },
  } = useAppContext()
  const currentAddress = addresses.find((address) => address.id === id)

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      street: currentAddress?.street,
      number: currentAddress?.number,
      location: currentAddress?.location.id,
    },
  })

  const handleEditAddress = async (data: any) => {
    try {
      const address: AddressParam = {
        street: data.street,
        number: data.number,
        location: locations.find((location) => location.id === data.location)!,
      }

      setIsLoading(true)
      setState({
        user: {
          addresses: addresses.map((addr) => {
            if (addr.id === currentAddress?.id) {
              return {
                ...addr,
                ...address,
              }
            }

            return addr
          }),
        },
      })

      if (token) {
        await api.patch(`/api/addresses/${currentAddress?.id}`, address, {
          headers: {
            Authorization: token,
          },
        })
      }

      router.push("/addresses")

      toast({
        title: "Feito!",
        description: "O endereço foi editado com sucesso",
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
      title="Editar endereço"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/addresses")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <form onSubmit={handleSubmit(handleEditAddress)}>
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
          <FormControl>
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
        </Flex>
        <Flex
          gap={4}
          mt={{ base: 0, md: 4 }}
          p={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <Button colorScheme="brand" type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </Flex>
      </form>
    </AppLayout>
  )
}

export default EditAddress
