import React from "react"
import { Box, Flex } from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import PaymentMethod from "@/modules/payment-methods/types/PaymentMethod"

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
      paymentMethods: true,
    },
  })

  return {
    props: {
      paymentMethods: store?.paymentMethods,
    },
  }
}

interface SelectLocationProps {
  paymentMethods: PaymentMethod[]
}

const SelectLocation = ({ paymentMethods }: SelectLocationProps) => {
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
      title="Pagamento"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/order")}
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
        {paymentMethods.map((paymentMethod) => (
          <Box
            key={paymentMethod.id}
            onClick={() => console.log(paymentMethod)}
            as="button"
            p={5}
            borderBottom="1px solid transparent"
            borderColor="gray.200"
            textAlign="left"
          >
            {paymentMethod.description}
          </Box>
        ))}
      </Flex>
    </AppLayout>
  )
}

export default SelectLocation
