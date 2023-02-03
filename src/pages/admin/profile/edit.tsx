import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import { GetServerSideProps } from "next"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"
import useUpdateProfile from "@/modules/profile/hooks/useUpdateProfile"

interface ProfileEditProps {
  user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context)
}

const EditProfile = ({ user }: ProfileEditProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { handleSubmitCallback, isSaving } = useUpdateProfile()

  const { register, handleSubmit } = useForm({
    defaultValues: user,
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <PageHeader
          title={t("editProfile")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/profile")}
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
            <DataCell>
              <DataHead>
                <Box as="span" fontWeight="500">
                  {t("name")}
                </Box>
              </DataHead>
              <DataValue>
                <FormControl>
                  <Input {...register("name")} />
                </FormControl>
              </DataValue>
            </DataCell>
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditProfile
