import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"
import { ReactNode } from "react"

interface BrandProps {
  logo: string
  storeName: string | ReactNode
  blue?: boolean
}

const Brand = ({ logo, storeName, blue = false }: BrandProps) => (
  <Flex
    as="a"
    href="https://gocomet.app"
    target="_blank"
    rel="noopener noreferrer"
    marginBottom={6}
    overflowX="hidden"
    alignItems="center"
  >
    <Image src={logo} width="30px" marginRight={3} marginLeft="8px" />
    <Flex direction="column" alignItems="center">
      <Heading
        size="sm"
        fontWeight="700"
        overflow="hidden"
        whiteSpace="nowrap"
        textTransform="uppercase"
        color={blue ? "brand.500" : "white"}
      >
        {storeName}
      </Heading>
    </Flex>
  </Flex>
)

export default Brand
