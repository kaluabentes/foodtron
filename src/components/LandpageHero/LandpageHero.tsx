import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react"

interface LandpageHeroProps {
  onCTAClick: () => void
}

const LandpageHero = ({ onCTAClick }: LandpageHeroProps) => (
  <>
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={9}
      p={{ base: 8, lg: 20 }}
      textAlign="center"
      maxWidth="900px"
      margin="0 auto"
    >
      <Heading size="2xl" lineHeight="1.2em" fontWeight="600">
        Crie seu próprio aplicativo de entregas e agilize os processos do seu
        restaurante.
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Sem taxas por pedido, experimente de graça.
      </Text>
      <Button onClick={onCTAClick} colorScheme="brand" size="lg">
        Entrar ou Cadastrar
      </Button>
    </Flex>
    <Box position="relative" p={{ base: 4, lg: 9 }} mb={20}>
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
        height="80%"
        right="0px"
        bottom="0px"
        shadow="md"
        borderRadius="md"
      />
    </Box>
  </>
)

export default LandpageHero
