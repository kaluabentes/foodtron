import React, { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"

import prisma from "@/lib/providers/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/admin/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import ChangeModal from "@/modules/app/components/ChangeModal"
import paymentMethods, { PaymentMethod } from "@/config/paymentMethods"

const Payment = () => {
  const router = useRouter()
  const { setState } = useAppContext()
  const { redirect } = router.query

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false)

  const handleRedirect = () => {
    if (redirect) {
      router.push(String(redirect))
      return
    }

    router.push("/order")
  }

  const addPaymentMethod = (name: string, change?: string) => {
    setState({
      order: {
        paymentMethod: {
          name,
          change,
        },
      },
    })

    handleRedirect()
  }

  const handleChangeConfirm = (change: string) => {
    setIsChangeModalOpen(false)
    addPaymentMethod(
      paymentMethods.find((p) => p.type === "cash")?.name!,
      change
    )
  }

  const handlePaymentClick = (paymentMethod: PaymentMethod) => {
    if (paymentMethod.type === "cash") {
      setIsChangeModalOpen(true)
      return
    }

    addPaymentMethod(paymentMethod.name)
  }

  return (
    <AppLayout
      title="Pagamento"
      leftIcon={
        <BarIconButton
          label="Voltar"
          onClick={handleRedirect}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Tabs colorScheme="brand" mt={{ base: 0, md: 4 }}>
        <TabList background="white">
          <Tab fontWeight="500" fontSize="sm">
            Pagar na entrega
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Flex
              direction="column"
              shadow="sm"
              backgroundColor="white"
              borderRadius="md"
              overflow="hidden"
              p={4}
            >
              <Heading fontWeight="600" p={2} fontSize="md">
                Escolha um método
              </Heading>
              {paymentMethods.map((paymentMethod) => (
                <Box
                  key={paymentMethod.type}
                  onClick={() => handlePaymentClick(paymentMethod)}
                  as="button"
                  p={4}
                  pr={2}
                  pl={2}
                  borderBottom="1px solid transparent"
                  borderColor="gray.100"
                  textAlign="left"
                  fontSize="md"
                >
                  {paymentMethod.name}
                </Box>
              ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ChangeModal
        isOpen={isChangeModalOpen}
        onConfirm={handleChangeConfirm}
        onClose={() => setIsChangeModalOpen(false)}
      />
    </AppLayout>
  )
}

export default Payment