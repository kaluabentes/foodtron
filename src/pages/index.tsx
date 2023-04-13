import LandpageHero from "@/components/LandpageHero"
import LandpageLayout from "@/layouts/LandpageLayout"
import { Box, Button, Container, Image } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <LandpageLayout>
      <Container maxWidth="container.xl">
        <LandpageHero />
      </Container>
    </LandpageLayout>
  )
}

export default Home
