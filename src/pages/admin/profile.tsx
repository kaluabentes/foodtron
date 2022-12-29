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
import prisma from "@/lib/prisma"
import { User } from "@prisma/client"

interface ProfileProps {
  user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  const user = await prisma.user.findFirst({
    where: {
      email: authResult.props.session.user?.email,
    },
  })

  return {
    props: {
      user: user,
    },
  }
}

const Profile = ({ user }: ProfileProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")
  const Role = new Map()
  Role.set("admin", t("admin"))
  Role.set("user", t("user"))

  return (
    <AppLayout>
      <PageHeader
        title={t("profile")}
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
                <Td>{get(user, "name", "")}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("email")}
                  </Box>
                </Td>
                <Td>{get(user, "email", "")}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box as="span" fontWeight="500">
                    {t("role")}
                  </Box>
                </Td>
                <Td>{Role.get(get(user, "role", ""))}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      )}
    </AppLayout>
  )
}

export default Profile
