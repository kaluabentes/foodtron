import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  FormHelperText,
} from "@chakra-ui/react"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import DataField from "@/components/DataField"
import useUpdateLocation from "@/modules/admin/locations/hooks/useUpdateLocation"
import auth from "@/middlewares/auth"
import { GetServerSideProps } from "next"
import { StoreDeliveryLocation, User } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async (user: User) => {
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
  location: StoreDeliveryLocation
}

const EditLocation = ({ location }: EditLocationProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { handleSubmitCallback, isSaving } = useUpdateLocation(location.id)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      neighborhood: location.neighborhood,
      tax: location.tax,
      estimatedTime: location.estimatedTime,
    },
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
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
              input={<Input {...register("tax")} type="text" isRequired />}
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
