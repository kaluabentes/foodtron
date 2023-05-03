import PageHeader from "@/components/PageHeader"
import AdminLayout from "@/layouts/AdminLayout"
import { Box, Flex, Switch, Text } from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import auth, { AuthProps } from "@/middlewares/auth"
import paymentMethods, { PaymentMethod } from "@/config/paymentMethods"
import useUpdateStore from "@/modules/admin/stores/hooks/useUpdateStore"
import { useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return auth(context, ["admin"])
}

const Payments = ({ user: { store } }: AuthProps) => {
  const [payments, setPayments] = useState<string[]>([])
  const { updateStore, isSaving } = useUpdateStore()

  useEffect(() => {
    if (payments.length > 0) {
      updateStore({
        paymentMethods: payments.join(","),
      })
    }
  }, [payments])

  console.log("payments", payments)

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
              checked={payments.includes(paymentMethod.type)}
              onChange={() =>
                setPayments((prev) =>
                  payments.includes(paymentMethod.type)
                    ? prev.filter(
                        (prevPaymentMethod) =>
                          prevPaymentMethod !== paymentMethod.type
                      )
                    : [...prev, paymentMethod.type]
                )
              }
              colorScheme="brand"
            />
          </Flex>
        ))}
      </Flex>
    </AdminLayout>
  )
}

export default Payments
