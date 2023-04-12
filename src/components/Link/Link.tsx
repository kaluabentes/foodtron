import NextLink from "next/link"
import { Box, Link as ChackraLink, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

interface LinkProps {
  path: string
  children?: ReactNode
}

const Link = ({ children, path }: LinkProps) => (
  <Box as="span" sx={{ "& a:focus-visible": { outline: "none" } }}>
    <NextLink href={path} passHref>
      <ChackraLink
        as="span"
        color={useColorModeValue("brand.500", "brand.300")}
        fontWeight="semibold"
        _active={{
          outline: "none",
        }}
      >
        {children}
      </ChackraLink>
    </NextLink>
  </Box>
)

export default Link
