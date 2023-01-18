import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Link,
  Switch,
  Text,
  Badge,
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
import prisma from "@/lib/infra/prisma"
import auth from "@/middlewares/auth"
import { User } from "@prisma/client"
import { BiEdit, BiTrash } from "react-icons/bi"
import DeleteAlert from "@/components/DeleteAlert"
import { useState } from "react"
import useDeleteLocation from "@/modules/admin/locations/hooks/useDeleteLocation"
import useGetLocations from "@/modules/admin/locations/hooks/useGetLocations"
import LocationsEmptyState from "@/modules/admin/locations/components/LocationsEmptyState"
import EmptyState from "@/components/EmptyState"

interface Location {
  id: string
  neighborhood: string
  tax: number
  estimatedTime: string
}

interface LocationsPageProps {
  locations: Location[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async (user: User) => {
    const locations = await prisma.storeDeliveryLocation.findMany({
      where: {
        storeId: user?.storeId!,
      },
    })

    return {
      props: {
        locations: locations.map((location) => ({
          ...location,
          tax: location.tax.toFixed(2),
        })),
      },
    }
  })
}

const Locations = ({ locations: preloadedLocations }: LocationsPageProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const isPageLoaded = useIsPageLoaded()
  const [selectedLocationId, setSelectedLocationId] = useState()
  const { deleteLocation, isDeleting } = useDeleteLocation()

  const { locations, getLocations, isLoading } =
    useGetLocations(preloadedLocations)

  const handleDeleteConfirm = async () => {
    if (selectedLocationId) {
      await deleteLocation(String(selectedLocationId))
      await getLocations(locations[0].storeId)
      setSelectedLocationId(undefined)
    }
  }

  const renderData = () => {
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
            {locations.map((location) => (
              <Tr key={location.id}>
                <Td>{location.neighborhood}</Td>
                <Td>{location.tax}</Td>
                <Td>{location.estimatedTime}</Td>
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
      <DeleteAlert
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
