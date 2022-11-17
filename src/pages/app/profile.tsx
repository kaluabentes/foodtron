import { useTranslation } from "react-i18next"
import { Heading, Box, Button, useColorModeValue } from "@chakra-ui/react"

import DataItem from "@/components/DataItem"
import AppLayout from "@/layouts/AppLayout"

const Profile = () => {
  const { t } = useTranslation()

  return (
    <AppLayout hasPadding={false}>
      <Heading size="lg" marginBottom={8} fontWeight="semibold" marginTop={8}>
        {t("profile")}
      </Heading>
      <Box
        marginBottom={9}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        backgroundColor={useColorModeValue("white", "gray.800")}
        borderRadius={{ base: "none", sm: 10 }}
        padding={5}
      >
        <DataItem label={t("name")} value="Kaluã Bentes" />
        <DataItem label={t("email")} value="kaluanbentes@gmail.com" />
        <DataItem label={t("role")} value="Administrador" />
      </Box>
      <Button colorScheme="brand" width={{ base: "full", md: "auto" }}>
        Editar
      </Button>
    </AppLayout>
  )
}

export default Profile
