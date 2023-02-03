import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BiEdit, BiTrash } from "react-icons/bi"

import DeleteAlert from "@/components/DeleteAlert"
import EmptyState from "@/components/EmptyState"
import PageHeader from "@/components/PageHeader"
import TableSkeleton from "@/components/TableSkeleton"
import AdminLayout from "@/layouts/AdminLayout"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import useGetSchedules from "@/modules/schedules/hooks/useGetSchedules"
import Schedule from "@/modules/schedules/types/Schedule"
import useDeleteSchedule from "@/modules/schedules/hooks/useDeleteSchedule"
import useGetPaymentMethods from "@/modules/payment-methods/hooks/useGetPaymentMethods"
import PaymentMethod from "@/modules/payment-methods/types/PaymentMethod"
import useDeletePaymentMethod from "@/modules/payment-methods/hooks/useDeletePaymentMethod"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const PaymentMethods = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | undefined
  >()

  const { paymentMethods, getPaymentMethods, isLoading } =
    useGetPaymentMethods()
  const { deletePaymentMethod, isDeleting } = useDeletePaymentMethod()

  const handleDeleteConfirm = async () => {
    if (selectedPaymentMethod) {
      await deletePaymentMethod(selectedPaymentMethod)
      await getPaymentMethods()
      setSelectedPaymentMethod(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={2} rows={4} />
    }

    if (!paymentMethods.length) {
      return <EmptyState message={t("schedulesEmptyState")} />
    }

    return (
      <Box
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="auto"
        marginBottom={8}
      >
        <Table>
          <Thead>
            <Th>{t("description")}</Th>
            <Th>{t("type")}</Th>
          </Thead>
          <Tbody>
            {paymentMethods.map((payment: PaymentMethod) => (
              <Tr key={payment.id}>
                <Td>{payment.description}</Td>
                <Td>{payment.type}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/payment-methods/edit/${payment.id}`)
                      }
                      aria-label="Editar localização"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover localização"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedPaymentMethod(payment.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  }

  return (
    <AdminLayout>
      <PageHeader
        title={t("paymentMethods")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/payment-methods/add")}
          >
            Adicionar
          </Button>
        }
      />
      {!isPageLoaded && (
        <Flex padding={10} align="center" justifyContent="center">
          <Spinner colorScheme="brand" />
        </Flex>
      )}
      {isPageLoaded && renderData()}
      <DeleteAlert
        title="Deletar método de pagamento"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedPaymentMethod)}
        isLoading={isDeleting || isLoading}
        onClose={() => setSelectedPaymentMethod(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default PaymentMethods
