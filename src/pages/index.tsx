import { Button } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()

  console.log("session", session)

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
    </>
  )
}

export default Home
