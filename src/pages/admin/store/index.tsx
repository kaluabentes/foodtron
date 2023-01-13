import { useTranslation } from "react-i18next"
import { Box, Button, Flex, Spinner, Link } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import TruncateText from "@/components/TruncateText"
import prisma from "@/lib/infra/prisma"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import StoreProps from "@/modules/admin/store/interfaces/StoreProps"

interface StorePageProps {
  store: StoreProps
}

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  const store = await prisma.store.findFirst({
    where: {
      id: authResult.props.session.user?.storeId!,
    },
  })

  return {
    props: {
      store: {
        ...store,
        minimumOrderPrice: store?.minimumOrderPrice?.toFixed(2),
      },
    },
  }
}

const Store = ({ store }: StorePageProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()

  return (
    <AppLayout>
      <PageHeader
        title={t("store")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/store/edit")}
          >
            Editar
          </Button>
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
                      {t("facebook")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.facebook}</TruncateText>
                  </DataValue>
                </DataCell>
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("instagram")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.instagram}</TruncateText>
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
                      {t("customDomain")}
                    </Box>
                  </DataHead>
                  <DataValue>
                    <TruncateText>{store.customDomain}</TruncateText>
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
                <DataCell>
                  <DataHead>
                    <Box as="span" fontWeight="500">
                      {t("isOpen")}
                    </Box>
                  </DataHead>
                  <DataValue>{store.isOpen ? t("yes") : t("no")}</DataValue>
                </DataCell>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </AppLayout>
  )
}

export default Store
