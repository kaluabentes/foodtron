import React from "react"
import { Box, Flex } from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/home/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/home/components/StoreInfo"
import Store from "@/modules/admin/store/types/Store"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useRouter } from "next/router"
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"

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

interface SelectLocationProps {
  locations: Location[]
}

const SelectLocation = ({ locations }: SelectLocationProps) => {
  const router = useRouter()

  const { setState } = useAppContext()

  const handleAddLocation = (location: Location) => {
    setState({
      address: {
        location,
      },
    })
    router.push("/")
  }

  return (
    <AppLayout
      title="Selecione um bairro"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/")}
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
      >
        {locations.map((location) => (
          <Box
            onClick={() => handleAddLocation(location)}
            as="button"
            p={5}
            borderBottom="1px solid transparent"
            borderColor="gray.200"
            textAlign="left"
          >
            {location.neighborhood}
          </Box>
        ))}
      </Flex>
    </AppLayout>
  )
}

export default SelectLocation
