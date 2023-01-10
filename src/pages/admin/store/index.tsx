import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  Table,
  Tr,
  Spinner,
  Tbody,
  Link,
} from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import { Store } from "@prisma/client"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import TruncateText from "@/components/TruncateText"
import prisma from "@/lib/infra/prisma"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import { useRouter } from "next/router"

interface StoreProps {
  store: Store
}

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  const user = await prisma.user.findFirst({
    where: {
      email: authResult.props.session.user?.email,
    },
    include: {
      store: true,
    },
  })

  return {
    props: {
      store: {
        ...user?.store,
        minimumOrderPrice: user?.store?.minimumOrderPrice?.toFixed(2),
      },
    },
  }
}

const Store = ({ store }: StoreProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")
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
            boxShadow={boxShadow}
            backgroundColor={boxBackground}
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
                  <DataValue>{String(store.minimumOrderPrice)}</DataValue>
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
