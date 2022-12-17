import { useTranslation } from "react-i18next"
import {
  Heading,
  Box,
  Button,
  useColorModeValue,
  Image,
} from "@chakra-ui/react"

import DataItem from "@/components/DataItem"
import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import { getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
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

  return (
    <AppLayout hasPadding={false}>
      <PageHeader
        title={t("profile")}
        actions={<Button colorScheme="brand">Editar</Button>}
      />
      <Box
        marginBottom={9}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        backgroundColor={useColorModeValue("white", "gray.800")}
        borderRadius={{ base: "none", sm: 10 }}
        padding={5}
      >
        <DataItem label={t("name")} value={session?.user?.name} />
        <DataItem label={t("email")} value={session?.user?.email} />
        {/* <DataItem label={t("role")} value="Administrador" /> */}
      </Box>
    </AppLayout>
  )
}

export default Profile
