import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"
import { ReactNode } from "react"

interface FoodtronBrandProps {
  logo: string
  storeName: string | ReactNode
  hideBrandText?: boolean
  width?: string
  height?: string
}

const FoodtronBrand = ({
  logo,
  storeName,
  hideBrandText,
  width,
  height,
}: FoodtronBrandProps) => (
  <Flex
    as="a"
    href="https://gocomet.app"
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
      marginLeft="9px"
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

export default FoodtronBrand
