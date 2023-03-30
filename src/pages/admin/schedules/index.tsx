import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { BiEdit } from "react-icons/bi"

import EmptyState from "@/components/EmptyState"
import PageHeader from "@/components/PageHeader"
import TableSkeleton from "@/components/TableSkeleton"
import AdminLayout from "@/layouts/AdminLayout"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import useGetSchedules from "@/modules/admin/schedules/hooks/useGetSchedules"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import useUpdateSchedule from "@/modules/admin/schedules/hooks/useUpdateSchedule"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const Schedules = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const { schedules, getSchedules, isLoading } = useGetSchedules()
  const { updateSchedule } = useUpdateSchedule()
  const [schedulesSwitchState, setSchedulesSwitchState] = useState<any[]>([])

  const getIsEnabledState = (id: string) =>
    schedulesSwitchState.find((schedule) => schedule.id === id)?.isEnabled

  const handleIsEnabledChange = async (id: string) => {
    setSchedulesSwitchState((prev) => {
      return prev.map((sched) => {
        if (sched.id === id) {
          updateSchedule(id, { isEnabled: !sched.isEnabled })

          return {
            ...sched,
            isEnabled: !sched.isEnabled,
          }
        }

        return sched
      })
    })
  }

  const getIsScheduledClosingState = (id: string) =>
    schedulesSwitchState.find((schedule) => schedule.id === id)
      ?.isScheduledClosing

  const handleIsScheduledClosingChange = async (id: string) => {
    setSchedulesSwitchState((prev) => {
      return prev.map((sched) => {
        if (sched.id === id) {
          updateSchedule(id, { isScheduledClosing: !sched.isScheduledClosing })

          return {
            ...sched,
            isScheduledClosing: !sched.isScheduledClosing,
          }
        }

        return sched
      })
    })
  }

  useEffect(() => {
    if (schedules.length > 0) {
      setSchedulesSwitchState(
        schedules.map((schedule: Schedule) => ({
          id: schedule.id,
          isEnabled: schedule.isEnabled,
          isScheduledClosing: schedule.isScheduledClosing,
        }))
      )
    }
  }, [schedules])

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
            <Th>Ativo?</Th>
            <Th>{t("weekDay")}</Th>
            <Th>{t("start")}</Th>
            <Th>{t("end")}</Th>
            <Th>{t("isScheduledClosing")}</Th>
            <Th>{t("actions")}</Th>
          </Thead>
          <Tbody>
            {schedules.map((schedule: Schedule) => (
              <Tr
                key={schedule.id}
                background={
                  !getIsEnabledState(schedule.id) ? "gray.50" : undefined
                }
                color={!getIsEnabledState(schedule.id) ? "gray.400" : undefined}
              >
                <Td>
                  <Switch
                    colorScheme="brand"
                    isChecked={getIsEnabledState(schedule.id)}
                    onChange={() => handleIsEnabledChange(schedule.id)}
                  />
                </Td>
                <Td>{weekDayMap.get(schedule.weekDay)}</Td>
                <Td>{schedule.start}</Td>
                <Td>{schedule.end}</Td>
                <Td>
                  <Switch
                    colorScheme="brand"
                    disabled={!getIsEnabledState(schedule.id)}
                    isChecked={
                      getIsEnabledState(schedule.id)
                        ? getIsScheduledClosingState(schedule.id)
                        : false
                    }
                    onChange={() => handleIsScheduledClosingChange(schedule.id)}
                  />
                </Td>
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
      <PageHeader title={t("schedules")} />
      {!isPageLoaded && (
        <Flex padding={10} align="center" justifyContent="center">
          <Spinner colorScheme="brand" />
        </Flex>
      )}
      {isPageLoaded && renderData()}
    </AdminLayout>
  )
}

export default Schedules
