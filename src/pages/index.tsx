import { Box, Button, Container, Image } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <>
      <h1>Home</h1>
      <Button
        variant="brand"
        width="full"
        type="submit"
        onClick={() => router.push("/auth/signin")}
      >
        Entrar ou cadastrar
      </Button>
      <Button
        variant="outlined"
        width="full"
        type="submit"
        onClick={() => signOut()}
      >
        {`${t("logout")} `}
      </Button>
      <Container maxWidth="container.xl">
        <Box p={5} position="relative">
          <Image
            width="100%"
            shadow="md"
            borderRadius="md"
            zIndex={1}
            src="/desktop.gif"
          />
          <Image
            position="absolute"
            zIndex={2}
            src="/mobile.gif"
            height="600px"
            right="-20px"
            bottom="-20px"
            shadow="md"
            borderRadius="md"
          />
        </Box>
      </Container>
    </>
  )
}

export default Home
