import PageHeader from "@/components/PageHeader"
import AdminLayout from "@/layouts/AdminLayout"
import { Box, Flex, Switch, Text } from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import auth, { AuthProps } from "@/middlewares/auth"
import paymentMethods, { PaymentMethod } from "@/config/paymentMethods"
import useUpdateStore from "@/modules/admin/stores/hooks/useUpdateStore"
import { useEffect, useState } from "react"
import useBottomToast from "@/lib/hooks/useBottomToast"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return auth(context, ["admin"])
}

const Payments = ({ user: { store } }: AuthProps) => {
  const toast = useBottomToast()

  const storePayments = store.paymentMethods
    ? store.paymentMethods?.split(",")
    : []
  const [payments, setPayments] = useState<string[]>(storePayments)
  const { updateStore } = useUpdateStore()

  const handleSavePayment = (payments: string[]) => {
    updateStore({
      paymentMethods: payments.join(","),
    }).then(() => {
      toast({
        title: "Sucesso",
        description: "Método de pagamento salvo",
        status: "success",
      })
    })
  }

  const handleSwitchChange = (paymentMethod: PaymentMethod) => {
    setPayments((prev) => {
      const value = payments.includes(paymentMethod.type)
        ? prev.filter(
            (prevPaymentMethod) => prevPaymentMethod !== paymentMethod.type
          )
        : [...prev, paymentMethod.type]

      handleSavePayment(value)

      return value
    })
  }

  return (
    <AdminLayout>
      <PageHeader title="Formas de pagamentos" />
      <Flex direction="column" gap={2} mb={4}>
        {paymentMethods.map((paymentMethod: PaymentMethod) => (
          <Flex
            background="white"
            justifyContent="space-between"
            shadow="sm"
            borderRadius="md"
            p={4}
          >
            <Text>{paymentMethod.name}</Text>
            <Switch
              isChecked={payments.includes(paymentMethod.type)}
              onChange={() => handleSwitchChange(paymentMethod)}
              colorScheme="brand"
            />
          </Flex>
        ))}
      </Flex>
    </AdminLayout>
  )
}

export default Payments
