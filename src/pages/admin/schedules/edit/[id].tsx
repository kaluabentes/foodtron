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
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import Schedule from "@/modules/admin/schedules/types/Schedule"
import prisma from "@/lib/infra/prisma/client"
import useUpdateSchedule from "@/modules/admin/schedules/hooks/useUpdateSchedule"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const schedule = await prisma.storeSchedule.findFirst({
      where: {
        id: String(id),
      },
    })

    return {
      props: {
        schedule,
      },
    }
  })
}

interface EditScheduleProps {
  schedule: Schedule
}

const EditSchedule = ({ schedule }: EditScheduleProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { updateSchedule, isUpdating } = useUpdateSchedule(schedule.id!)

  const { register, handleSubmit } = useForm({
    defaultValues: schedule,
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(updateSchedule)}>
        <PageHeader
          title={t("addSchedule")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/schedules")}
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
              label={t("weekDay")}
              input={
                <Select {...register("weekDay")} placeholder="Selecione">
                  <option value="0">Domingo</option>
                  <option value="1">Segunda</option>
                  <option value="2">Terça</option>
                  <option value="3">Quarta</option>
                  <option value="4">Quinta</option>
                  <option value="5">Sexta</option>
                  <option value="6">Sábado</option>
                </Select>
              }
            />
            <DataField
              label={t("start")}
              input={<Input {...register("start")} type="time" />}
            />
            <DataField
              label={t("end")}
              input={<Input {...register("end")} type="time" />}
            />
            <DataField
              label={t("isScheduledClosing")}
              input={<Switch {...register("isScheduledClosing")} />}
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditSchedule
