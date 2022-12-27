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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const Profile = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")

  useEffect(() => {
    if (!session?.user?.name) {
      window.location.reload()
    }
  }, [])

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
                  <strong>{t("name")}</strong>
                </Td>
                <Td>{get(session, "user.name", "")}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      )}
    </AppLayout>
  )
}

export default Profile
