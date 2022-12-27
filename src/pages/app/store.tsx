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
      store: user?.store,
    },
  }
}

const Store = ({ store }: StoreProps) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")

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
        <Flex
          boxShadow={boxShadow}
          backgroundColor={boxBackground}
          borderRadius={10}
          direction="column"
          gap="8px"
        >
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("name")}
                  </Box>
                </Td>
                <Td>{store.name}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("address")}
                  </Box>
                </Td>
                <Td>{store.address}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("whatsapp")}
                  </Box>
                </Td>
                <Td>{store.whatsapp}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("facebook")}
                  </Box>
                </Td>
                <Td>{store.facebook}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("instagram")}
                  </Box>
                </Td>
                <Td>{store.instagram}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("subdomain")}
                  </Box>
                </Td>
                <Td>{`${store.subdomain}.${APEX_DOMAIN}`}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("customDomain")}
                  </Box>
                </Td>
                <Td>{store.customDomain}</Td>
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
        </Flex>
      )}
    </AppLayout>
  )
}

export default Store
