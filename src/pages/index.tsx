import { Button } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <h1>Home</h1>
      <Button
        variant="brand"
        width="full"
        type="submit"
        onClick={() => router.push("/signin")}
      >
        {`${t("signin")} `}
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
