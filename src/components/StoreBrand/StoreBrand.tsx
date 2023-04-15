import subWord from "@/lib/helpers/string/subWord"
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"
import { ReactNode } from "react"

interface StoreBrandProps {
  logo: string
  storeName: string
  hideBrandText?: boolean
  width?: string
  height?: string
}

const StoreBrand = ({
  logo,
  storeName,
  hideBrandText,
  width,
  height,
}: StoreBrandProps) => (
  <Flex
    as="a"
    href="https://foodtron.app"
    target="_blank"
    rel="noopener noreferrer"
    marginBottom={6}
    overflowX="hidden"
    alignItems="center"
    width="200px"
    height="36px"
  >
    <Image
      borderRadius="md"
      src={logo}
      height="36px"
      marginRight={4}
      marginLeft="5px"
    />
    <Heading
      size="sm"
      fontWeight="700"
      visibility={hideBrandText ? "hidden" : "visible"}
      opacity={hideBrandText ? "0" : "1"}
      transition="0.3s"
      color="gray.700"
    >
      {subWord(storeName, 0, 3)}
    </Heading>
  </Flex>
)

export default StoreBrand
