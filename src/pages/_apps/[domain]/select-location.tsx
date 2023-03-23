import React from "react"
import { Box, Flex } from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
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
            key={location.id}
            onClick={() => handleAddLocation(location)}
            as="button"
            p={4}
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
