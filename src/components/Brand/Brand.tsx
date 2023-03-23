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
    href="https://gocomet.app"
    target="_blank"
    rel="noopener noreferrer"
    marginBottom={6}
    overflowX="hidden"
    alignItems="center"
    width="200px"
    height="32px"
  >
    <Image
      borderRadius="md"
      src={logo}
      width="30px"
      marginRight={3}
      marginLeft="7px"
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
