import { useTranslation } from "react-i18next"
import { Box, Button, Flex, Spinner, Input } from "@chakra-ui/react"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import { GetServerSideProps } from "next"
import useCreateCategory from "@/modules/admin/categories/hooks/useCreateCategory"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const AddCategory = () => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { createCategory, isCreating } = useCreateCategory()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
    },
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(createCategory)}>
        <PageHeader
          title={t("addCategories")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/categories")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isCreating} type="submit">
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
              label={t("title")}
              input={<Input {...register("title")} />}
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default AddCategory
