import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  FormHelperText,
  Select,
  Switch,
} from "@chakra-ui/react"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import { GetServerSideProps } from "next"
import useCreatePaymentMethod from "@/modules/admin/payment-methods/hooks/useCreatePaymentMethod"
import prisma from "@/lib/infra/prisma/client"
import PaymentMethod from "@/modules/admin/payment-methods/types/PaymentMethod"
import useUpdatePaymentMethod from "@/modules/admin/payment-methods/hooks/useUpdatePaymentMethod"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const { id } = context.query
    const paymentMethod = await prisma.storePaymentMethod.findFirst({
      where: {
        id: String(id),
      },
    })

    return {
      props: {
        paymentMethod,
      },
    }
  })
}

interface EditPaymentMethodProps {
  paymentMethod: PaymentMethod
}

const EditPaymentMethod = ({ paymentMethod }: EditPaymentMethodProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { updatePaymentMethod, isUpdating } = useUpdatePaymentMethod(
    String(paymentMethod.id)
  )

  const { register, handleSubmit } = useForm({
    defaultValues: paymentMethod,
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(updatePaymentMethod)}>
        <PageHeader
          title={t("addPayment")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/payment-methods")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isUpdating} type="submit">
                {t("save")}
              </Button>
            </Flex>
          }
        />
        {!isPageLoaded && (
          <Flex padding={10} align="center" justifyContent="center">
            <Spinner colorScheme="brand" />
          </Flex>
        )}
        {isPageLoaded && (
          <Box
            shadow="sm"
            backgroundColor="white"
            borderRadius={10}
            overflow="hidden"
            marginBottom={8}
          >
            <DataField
              label={t("description")}
              input={<Input {...register("description")} required />}
            />
            <DataField
              label={t("type")}
              input={
                <Select {...register("type")} placeholder="Selecione" required>
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="cash">Dinheiro</option>
                </Select>
              }
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditPaymentMethod
