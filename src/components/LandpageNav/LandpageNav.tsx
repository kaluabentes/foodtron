import { Box, Container, Flex, Image } from "@chakra-ui/react"

const LandpageNav = () => (
  <Flex
    justifyContent="center"
    as="a"
    href="https://foodtron.app"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image src="/comet-full.svg" height="40px" mb={0} mt={5} />
  </Flex>
)

export default LandpageNav
