import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"

interface BrandProps {
  logo: string
  storeName: string
}

const Brand = ({ logo, storeName }: BrandProps) => (
  <Flex marginBottom={12} overflowX="hidden" alignItems="center">
    <Image
      src={logo}
      alt={storeName}
      width="30px"
      marginRight={4}
      marginLeft="8px"
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

export default Brand
