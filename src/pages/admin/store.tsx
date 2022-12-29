import { useTranslation } from "react-i18next"
import {
  Heading,
  Box,
  Button,
  useColorModeValue,
  Image,
  Flex,
  Table,
  Tr,
  Td,
  Spinner,
  Tbody,
  Link,
} from "@chakra-ui/react"
import { get } from "lodash"

import DataItem from "@/components/DataItem"
import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import useIsPageLoaded from "@/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import { Store } from "@prisma/client"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import TruncateText from "@/components/TruncateText"
import { Decimal } from "@prisma/client/runtime"

interface StoreProps {
  store?: Store
  error?: any
}

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
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
        store: user?.store,
      },
    }
  } catch (error: any) {
    return {
      props: {
        error,
      },
    }
  }
}

const storeFallback = {
  id: "",
  name: "",
  logo: "",
  cover: "",
  address: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  subdomain: "",
  customDomain: "",
  minimumOrderPrice: null,
  isOpen: false,
}

// const Store = () => {
const Store = ({ store = storeFallback, error }: StoreProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")

  console.log("error", error)

  return (
    <AppLayout>
      <PageHeader
        title={t("store")}
        actions={<Button colorScheme="brand">Editar</Button>}
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
              <Table marginTop={8} sx={{ tableLayout: "fixed" }}>
                <Tbody>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("name")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.name}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("address")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.address}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("whatsapp")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.whatsapp}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("facebook")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.facebook}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("instagram")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.instagram}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("subdomain")}
                      </Box>
                    </Td>
                    <Td>
                      <Link
                        href={`https://${store.subdomain}.${APEX_DOMAIN}`}
                        isExternal
                        color="brand.500"
                      >
                        <TruncateText>{`${store.subdomain}.${APEX_DOMAIN}`}</TruncateText>
                      </Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("customDomain")}
                      </Box>
                    </Td>
                    <Td>
                      <TruncateText>{store.customDomain}</TruncateText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("minimumOrderPrice")}
                      </Box>
                    </Td>
                    <Td>{String(store.minimumOrderPrice)}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box as="span" fontWeight="500">
                        {t("isOpen")}
                      </Box>
                    </Td>
                    <Td>{store.isOpen ? t("yes") : t("no")}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </>
      )}
    </AppLayout>
  )
}

export default Store
