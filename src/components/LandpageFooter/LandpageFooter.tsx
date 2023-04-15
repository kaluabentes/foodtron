import { Box, Container, Flex, Text } from "@chakra-ui/react"
import Link from "../Link"

const LandpageFooter = () => (
  <Box borderTop="1px solid black" borderColor="gray.200">
    <Container maxWidth="container.xl">
      <Flex gap={6} pt={4} pb={4}>
        <Text color="gray.600" fontSize="sm">
          &copy; {new Date().getFullYear()} Foodtron
        </Text>
        <Link fontSize="sm" path="/terms-of-use">
          Termos de uso
        </Link>
        <Link fontSize="sm" path="/privacy-policy">
          Políticas de privacidade
        </Link>
      </Flex>
    </Container>
  </Box>
)

export default LandpageFooter
