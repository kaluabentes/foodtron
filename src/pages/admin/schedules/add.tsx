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
import useAddSchedule from "@/modules/admin/schedules/hooks/useAddSchedule"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const AddSchedule = () => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { addSchedule, isAdding } = useAddSchedule()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      weekDay: "",
      start: "",
      end: "",
      isScheduledClosing: false,
    },
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(addSchedule)}>
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
              <Button colorScheme="brand" isLoading={isAdding} type="submit">
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
                <Select
                  {...register("weekDay")}
                  placeholder="Selecione"
                  required
                >
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
              input={<Input {...register("start")} type="time" required />}
            />
            <DataField
              label={t("end")}
              input={<Input {...register("end")} type="time" required />}
            />
            <DataField
              label={t("isScheduledClosing")}
              input={
                <Switch
                  colorScheme="brand"
                  {...register("isScheduledClosing")}
                />
              }
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default AddSchedule
