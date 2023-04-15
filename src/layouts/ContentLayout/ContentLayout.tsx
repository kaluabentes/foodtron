import { Box, Container } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ContentLayoutProps {
  children: ReactNode
}

const ContentLayout = ({ children }: ContentLayoutProps) => (
  <Box
    background="white"
    mt={8}
    p={{ base: 4, lg: 6 }}
    sx={{
      "& p": {
        color: "gray.600",
        lineHeight: 1.75,
        marginBottom: 6,
      },
      "& h1": {
        fontSize: "3xl",
        fontWeight: "semibold",
        marginBottom: 6,
      },
      "& h2, & h3, & h4, & h5, & h6": {
        fontSize: "2xl",
        marginBottom: 6,
        fontWeight: "semibold",
      },
      "& a": {
        color: "blue.500",
        textDecoration: "underline",
      },
      "& img": {
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);",
        borderRadius: "1rem",
        width: "100%",
      },
      "& ol, & ul": {
        color: "gray.600",
        paddingLeft: 10,
        marginBottom: 6,
      },
      "& li": {
        marginBottom: 3,
      },
    }}
  >
    <Container>{children}</Container>
  </Box>
)

export default ContentLayout
