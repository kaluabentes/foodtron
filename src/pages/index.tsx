import { Button } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>Home</h1>
      <Button
        variant="brand"
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
