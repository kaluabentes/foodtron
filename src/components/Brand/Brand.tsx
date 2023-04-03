import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"
import { ReactNode } from "react"

interface BrandProps {
  logo: string
  storeName: string | ReactNode
  hideBrandText?: boolean
  width?: string
  height?: string
}

const Brand = ({
  logo,
  storeName,
  hideBrandText,
  width,
  height,
}: BrandProps) => (
  <Flex
    as="a"
    href="https://foodtron.app"
    target="_blank"
    rel="noopener noreferrer"
    marginBottom={6}
    overflowX="hidden"
    alignItems="center"
    width="200px"
    height="38px"
  >
    <Image
      borderRadius="md"
      src={logo}
      height="38px"
      marginRight={4}
      marginLeft="10px"
    />
    <Heading
      size="sm"
      fontWeight="700"
      visibility={hideBrandText ? "hidden" : "visible"}
      opacity={hideBrandText ? "0" : "1"}
      transition="0.3s"
      color="gray.700"
    >
      {storeName}
    </Heading>
  </Flex>
)

export default Brand
