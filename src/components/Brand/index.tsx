import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"

interface BrandProps {
  logo: string
  storeName: string
  blue?: boolean
}

const Brand = ({ logo, storeName, blue = false }: BrandProps) => (
  <Flex marginBottom={8} overflowX="hidden" alignItems="center">
    <Image
      src={logo}
      alt={storeName}
      width="30px"
      marginRight={3}
      marginLeft="8px"
    />
    <Flex direction="column" alignItems="center">
      <Heading
        size="md"
        fontWeight="700"
        overflow="hidden"
        whiteSpace="nowrap"
        color={blue ? "brand.500" : "white"}
      >
        {storeName}
      </Heading>
    </Flex>
  </Flex>
)

export default Brand
