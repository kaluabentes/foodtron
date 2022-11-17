import NextLink from "next/link"
import { Link as ChackraLink, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

interface LinkProps {
  path: string
  children?: ReactNode
}

const Link = ({ children, path }: LinkProps) => (
  <NextLink href={path} passHref>
    <ChackraLink
      color={useColorModeValue("brand.500", "brand.300")}
      fontWeight="semibold"
    >
      {children}
    </ChackraLink>
  </NextLink>
)

export default Link
