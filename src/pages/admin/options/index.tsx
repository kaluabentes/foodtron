import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
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
import useGetOptions from "@/modules/admin/options/hooks/useGetOptions"
import useDeleteOption from "@/modules/admin/options/hooks/useDeleteOption"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const Options = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>()

  const { options, getOptions, isLoading } = useGetOptions()
  const { deleteOption, isDeleting } = useDeleteOption()

  const handleDeleteConfirm = async () => {
    if (selectedOptionId) {
      await deleteOption(selectedOptionId)
      await getOptions()
      setSelectedOptionId(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!options.length) {
      return <EmptyState message={t("optionsEmptyState")} />
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
            <Th>{t("maxOption")}</Th>
            <Th>{t("maxOptionRequired")}</Th>
            <Th>{t("required")}</Th>
            <Th>{t("actions")}</Th>
          </Thead>
          <Tbody>
            {options.map((option: OptionGroup) => (
              <Tr key={option.id}>
                <Td>{option.title}</Td>
                <Td>{option.maxOption}</Td>
                <Td>{option.maxOptionRequired ? "Sim" : "Não"}</Td>
                <Td>{option.required ? "Sim" : "Não"}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/options/edit/${option.id}`)
                      }
                      aria-label="Editar produto"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover produto"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedOptionId(option.id)}
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
        title={t("options")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/options/add")}
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
        title="Deletar opção"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedOptionId)}
        isLoading={isDeleting}
        onClose={() => setSelectedOptionId(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default Options
