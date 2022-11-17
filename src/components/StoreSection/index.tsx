import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"

interface StoreSectionProps {
  logo: string
  storeName: string
}

const StoreSection = ({ logo, storeName }: StoreSectionProps) => (
  <Flex marginBottom={12} overflowX="hidden" alignItems="center">
    <Image
      src={logo}
      alt={storeName}
      height="40px"
      minWidth="40px"
      width="40px"
      objectFit="cover"
      marginRight={3}
      marginLeft="2px"
    />
    <Flex direction="column" alignItems="center">
      <Heading
        size="20px"
        fontWeight="700"
        overflow="hidden"
        color="white"
        whiteSpace="nowrap"
      >
        {storeName}
      </Heading>
    </Flex>
  </Flex>
)

export default StoreSection
