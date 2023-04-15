import NextLink from "next/link"
import { Box, Link as ChackraLink, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

interface LinkProps {
  path: string
  children?: ReactNode
  fontSize?: string
  color?: string
}

const Link = ({
  children,
  path,
  fontSize = "md",
  color = "brand.500",
}: LinkProps) => (
  <Box
    as="span"
    sx={{ "& a:focus-visible": { outline: "none" } }}
    fontSize={fontSize}
  >
    <NextLink href={path} passHref>
      <ChackraLink
        as="span"
        color={color}
        fontWeight="500"
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
