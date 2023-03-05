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

import ConfirmAlert from "@/components/ConfirmAlert"
import EmptyState from "@/components/EmptyState"
import PageHeader from "@/components/PageHeader"
import TableSkeleton from "@/components/TableSkeleton"
import AdminLayout from "@/layouts/AdminLayout"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import useGetSchedules from "@/modules/schedules/hooks/useGetSchedules"
import Schedule from "@/modules/schedules/types/Schedule"
import useDeleteSchedule from "@/modules/schedules/hooks/useDeleteSchedule"
import useGetCategories from "@/modules/categories/hooks/useGetCategories"
import useDeleteCategory from "@/modules/categories/hooks/useDeleteCategory"
import Category from "@/modules/categories/types/Category"

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

const Categories = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >()

  const { categories, getCategories, isLoading } = useGetCategories()
  const { deleteCategory, isDeleting } = useDeleteCategory()

  const handleDeleteConfirm = async () => {
    if (selectedCategoryId) {
      await deleteCategory(selectedCategoryId)
      await getCategories()
      setSelectedCategoryId(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!categories.length) {
      return <EmptyState message={t("categoriesEmptyState")} />
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
            <Th>{t("title")}</Th>
            <Th>{t("actions")}</Th>
          </Thead>
          <Tbody>
            {categories.map((category: Category) => (
              <Tr key={category.id}>
                <Td>{category.title}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/categories/edit/${category.id}`)
                      }
                      aria-label="Editar categoria"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover categoria"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedCategoryId(category.id)}
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
        title={t("categories")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/categories/add")}
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
      <ConfirmAlert
        title="Deletar categoria"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedCategoryId)}
        isLoading={isDeleting}
        onClose={() => setSelectedCategoryId(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default Categories
