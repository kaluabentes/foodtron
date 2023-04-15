import { Box, Flex } from "@chakra-ui/react"

interface TrackOrderButtonProps {
  onClick: () => void
}

const TrackOrderButton = ({ onClick }: TrackOrderButtonProps) => (
  <Flex
    position="fixed"
    background="white"
    p={4}
    pt={5}
    pb={5}
    borderRadius={{ base: undefined, lg: "md" }}
    bottom={{ base: "72px", lg: 4 }}
    right={{ base: "0", lg: 4 }}
    width={{ base: "full", lg: "initial" }}
    boxShadow="0 -1px 2px 0 rgba(0, 0, 0, 0.05);"
    alignItems="center"
    gap={4}
    lineHeight="0px"
    zIndex="100"
    onClick={onClick}
    as="button"
    overflow="hidden"
    border="1px solid gray"
    borderColor="gray.200"
    fontWeight="500"
  >
    <Box
      position="absolute"
      height="100%"
      width="5px"
      background="brand.500"
      top="0"
      left="0"
      zIndex="10"
    />
    <Box
      width="12px"
      height="12px"
      borderRadius="50%"
      background="orange"
      color="white"
      alignItems="center"
      animation="pulse 2s infinite"
      justifyContent="center"
    />
    Acompanhar pedido
  </Flex>
)

export default TrackOrderButton
