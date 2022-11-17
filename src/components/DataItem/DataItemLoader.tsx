import { Box, Flex, Skeleton } from "@chakra-ui/react"

const DataItemLoader = () => (
  <Flex
    borderBottom="1px solid rgba(0, 0, 0, 0.1)"
    paddingBottom={4}
    paddingTop={4}
    gap={4}
    _last={{ borderBottom: "none" }}
  >
    <Box width="50%">
      <Skeleton height="15px" />
    </Box>
    <Box width="50%">
      <Skeleton height="15px" />
    </Box>
  </Flex>
)

export default DataItemLoader
