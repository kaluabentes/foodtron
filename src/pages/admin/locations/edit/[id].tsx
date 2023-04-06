import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  FormHelperText,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import useUpdateLocation from "@/modules/admin/locations/hooks/useUpdateLocation"
import auth from "@/middlewares/auth"
import Location from "@/modules/admin/locations/types/Location"
import prisma from "@/lib/infra/prisma/client"
import { ChangeEvent } from "react"
import filterNumber from "@/lib/helpers/string/filterNumber"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const location = await prisma.storeDeliveryLocation.findFirst({
      where: {
        id: String(id),
      },
    })

    return {
      props: {
        location: {
          ...location,
          tax: location?.tax.toFixed(2),
        },
      },
    }
  })
}

interface EditLocationProps {
  location: Location
}

const EditLocation = ({ location }: EditLocationProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { updateLocation, isSaving } = useUpdateLocation(location.id)

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      neighborhood: location.neighborhood,
      tax: location.tax,
      estimatedTime: location.estimatedTime,
    },
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(updateLocation)}>
        <PageHeader
          title={t("addLocation")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/locations")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isSaving} type="submit">
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
              label={t("neighborhood")}
              input={<Input {...register("neighborhood")} isRequired />}
            />
            <DataField
              label={t("tax")}
              input={
                <Input
                  value={String(watch("tax"))}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setValue("tax", filterNumber(event.currentTarget.value))
                  }
                  required
                />
              }
            />
            <DataField
              label={t("estimatedTime")}
              input={
                <>
                  <Input
                    {...register("estimatedTime")}
                    type="number"
                    isRequired
                  />
                  <FormHelperText>Tempo estimado em minutos</FormHelperText>
                </>
              }
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditLocation
