import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  Tr,
  Td,
  Thead,
  Th,
  Tbody,
  IconButton,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import { BiEdit, BiTrash } from "react-icons/bi"
import ConfirmAlert from "@/components/ConfirmAlert"
import { useState } from "react"
import useDeleteLocation from "@/modules/admin/locations/hooks/useDeleteLocation"
import useGetLocations from "@/modules/admin/locations/hooks/useGetLocations"
import EmptyState from "@/components/EmptyState"
import TableSkeleton from "@/components/TableSkeleton"
import Location from "@/modules/admin/locations/types/Location"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const Locations = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const isPageLoaded = useIsPageLoaded()
  const [selectedLocationId, setSelectedLocationId] = useState<
    string | undefined
  >()
  const { deleteLocation, isDeleting } = useDeleteLocation()

  const { locations, getLocations, isLoading } = useGetLocations()

  const handleDeleteConfirm = async () => {
    if (selectedLocationId) {
      await deleteLocation(String(selectedLocationId))
      await getLocations()
      setSelectedLocationId(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!locations.length) {
      return (
        <EmptyState message="Não há localizações cadastradas no momento." />
      )
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
            <Th>{t("neighborhood")}</Th>
            <Th>{t("tax")}</Th>
            <Th>{t("estimatedTime")}</Th>
            <Th>{t("actions")}</Th>
          </Thead>
          <Tbody>
            {locations.map((location: Location) => (
              <Tr key={location.id}>
                <Td>{location.neighborhood}</Td>
                <Td>
                  R${" "}
                  {Number(location.tax).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td>{location.estimatedTime} min.</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/locations/edit/${location.id}`)
                      }
                      aria-label="Editar localização"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover localização"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedLocationId(location.id)}
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
        title={t("locations")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/locations/add")}
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
        title="Deletar localização"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedLocationId)}
        isLoading={isLoading || isDeleting}
        onClose={() => setSelectedLocationId(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default Locations
