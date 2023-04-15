import { Flex, Spinner } from "@chakra-ui/react"

const PageLoaderSpinner = () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="100vh"
    width="100vw"
    background="gray.200"
    transition="0.5s"
    zIndex="100"
    position="fixed"
    top={0}
    left={0}
  >
    <Spinner
      thickness="4px"
      color="brand.400"
      emptyColor="gray.200"
      size="xl"
    />
  </Flex>
)

export default PageLoaderSpinner
