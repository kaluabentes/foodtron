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
import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"

import DataItem from "@/components/DataItem"
import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import prisma from "@/lib/infra/prisma"
import { User } from "@prisma/client"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import TruncateText from "@/components/TruncateText"
import { useRouter } from "next/router"

interface ProfileProps {
  user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context)
}

const Profile = ({ user }: ProfileProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()

  const Role = new Map()
  Role.set("admin", t("admin"))
  Role.set("user", t("user"))

  return (
    <AdminLayout>
      <PageHeader
        title={t("profile")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/profile/edit")}
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
        <Box shadow="sm" backgroundColor="white" borderRadius={10}>
          <DataCell>
            <DataHead>
              <Box as="span" fontWeight="500">
                {t("name")}
              </Box>
            </DataHead>
            <DataValue>
              <TruncateText>{user.name}</TruncateText>
            </DataValue>
          </DataCell>
          <DataCell>
            <DataHead>
              <Box as="span" fontWeight="500">
                {t("email")}
              </Box>
            </DataHead>
            <DataValue>
              <TruncateText>{user.email}</TruncateText>
            </DataValue>
          </DataCell>
          <DataCell>
            <DataHead>
              <Box as="span" fontWeight="500">
                {t("role")}
              </Box>
            </DataHead>
            <DataValue>
              <TruncateText>{user.role}</TruncateText>
            </DataValue>
          </DataCell>
        </Box>
      )}
    </AdminLayout>
  )
}

export default Profile
