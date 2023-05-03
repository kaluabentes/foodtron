import { Box, Button, Container, Flex, Image } from "@chakra-ui/react"

interface LandpageHeaderProps {
  onCTAClick: () => void
}

const LandpageHeader = ({ onCTAClick }: LandpageHeaderProps) => (
  <Box position="fixed" left="0" top="0" width="100%" p={4} background="white">
    <Container maxWidth="container.xl" p={0}>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex
          justifyContent="center"
          as="a"
          href={
            process.env.NODE_ENV === "production"
              ? "https://foodtron.app"
              : "http://localhost:3000"
          }
          alignItems="center"
        >
          <Image src="/comet-full.svg" height={{ base: "30px", md: "40px" }} />
        </Flex>
        <Button
          onClick={onCTAClick}
          colorScheme="brand"
          size={{ base: "sm", md: "md" }}
        >
          Entrar ou Cadastrar
        </Button>
      </Flex>
    </Container>
  </Box>
)

export default LandpageHeader
