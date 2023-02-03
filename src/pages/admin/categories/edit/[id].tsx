import { useTranslation } from "react-i18next"
import { Box, Button, Flex, Spinner, Input } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import prisma from "@/lib/infra/prisma/client"
import Category from "@/modules/categories/types/Category"
import useUpdateCategory from "@/modules/categories/hooks/useUpdateCategory"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const category = await prisma.category.findFirst({
      where: {
        id: String(id),
      },
    })

    return {
      props: {
        category,
      },
    }
  })
}

interface EditCategoryProps {
  category: Category
}

const EditCategory = ({ category }: EditCategoryProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const { updateCategory, isUpdating } = useUpdateCategory(category.id!)

  const { register, handleSubmit } = useForm({
    defaultValues: category,
  })

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(updateCategory)}>
        <PageHeader
          title={t("editCategory")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/categories")}
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
              label={t("title")}
              input={<Input {...register("title")} />}
            />
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditCategory
