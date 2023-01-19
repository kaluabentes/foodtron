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
import useGetSchedules from "@/modules/admin/schedules/hooks/useGetSchedules"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import useDeleteSchedule from "@/modules/admin/schedules/hooks/useDeleteSchedule"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const weekDay = new Map()
weekDay.set("0", "Domingo")
weekDay.set("1", "Segunda")
weekDay.set("2", "Terça")
weekDay.set("3", "Quarta")
weekDay.set("4", "Quinta")
weekDay.set("5", "Sexta")
weekDay.set("6", "Sábado")

const Schedules = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const [selectedScheduleId, setSelectedScheduleId] = useState<
    string | undefined
  >()

  const { schedules, getSchedules, isLoading } = useGetSchedules()
  const { deleteSchedule, isDeleting } = useDeleteSchedule()

  const handleDeleteConfirm = async () => {
    if (selectedScheduleId) {
      await deleteSchedule(selectedScheduleId)
      await getSchedules()
      setSelectedScheduleId(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!schedules.length) {
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
            <Th>{t("weekDay")}</Th>
            <Th>{t("start")}</Th>
            <Th>{t("end")}</Th>
            <Th>{t("isScheduledClosing")}</Th>
          </Thead>
          <Tbody>
            {schedules.map((schedule: Schedule) => (
              <Tr key={schedule.id}>
                <Td>{weekDay.get(schedule.weekDay)}</Td>
                <Td>{schedule.start}</Td>
                <Td>{schedule.end}</Td>
                <Td>{schedule.isScheduledClosing ? t("yes") : t("no")}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/schedules/edit/${schedule.id}`)
                      }
                      aria-label="Editar localização"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover localização"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedScheduleId(schedule.id)}
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
        title="Deletar horário"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedScheduleId)}
        isLoading={isDeleting}
        onClose={() => setSelectedScheduleId(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default Schedules
