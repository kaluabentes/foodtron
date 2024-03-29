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
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import TruncateText from "@/components/TruncateText"
import prisma from "@/lib/providers/prisma/client"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import Store from "@/modules/admin/stores/types/Store"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import useUpdateStore from "@/modules/admin/stores/hooks/useUpdateStore"

interface StorePageProps {
  store: Store
}

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async (user: User) => {
    const store = await prisma.store.findFirst({
      where: {
        id: user?.storeId!,
      },
    })

    return {
      props: {
        store: {
          ...store,
          minimumOrderPrice: store?.minimumOrderPrice
            ? store?.minimumOrderPrice?.toFixed(2)
            : null,
        },
      },
    }
  })
}

const Store = ({ store }: StorePageProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(store.isOpen!)
  const { updateStore } = useUpdateStore()

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => {
      updateStore({ isOpen: !prev })
      return !prev
    })
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Configurações"
        actions={
          <Flex gap={3} alignItems="center">
            {isOpen ? (
              <Badge colorScheme="green">Aberto</Badge>
            ) : (
              <Badge colorScheme="red">Fechado</Badge>
            )}
            <Switch
              colorScheme="brand"
              isChecked={isOpen}
              onChange={handleToggleIsOpen}
            />
            <Button
              colorScheme="brand"
              onClick={() => router.push("/admin/settings/edit")}
            >
              Editar
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
        <>
          <Box
            shadow="sm"
            backgroundColor="white"
            borderRadius={10}
            overflow="hidden"
            marginBottom={8}
          >
            <StoreMidiaUpload
              defaultCover={store.cover!}
              defaultLogo={store.logo!}
              isEditable={false}
            />
            <Box overflow="hidden">
              <Box marginTop={8} sx={{ tableLayout: "fixed" }}>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("name")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.name}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("whatsapp")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.whatsapp}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("address")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.address}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      Cidade
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.city}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      Estado
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.state}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      CEP
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.cep}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      CNPJ
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.cnpj}</TruncateText>
                  </DataValue>
                </DataCell>

                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("subdomain")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <Link
                      href={`https://${store.subdomain}.${APEX_DOMAIN}`}
                      isExternal
                      color="brand.500"
                    >
                      <TruncateText>{`${store.subdomain}.${APEX_DOMAIN}`}</TruncateText>
                    </Link>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("minimumOrderPrice")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    R${" "}
                    {Number(store.minimumOrderPrice).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </DataValue>
                </DataCell>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </AdminLayout>
  )
}

export default Store
