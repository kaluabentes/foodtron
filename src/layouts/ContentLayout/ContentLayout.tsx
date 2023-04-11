import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ContentLayoutProps {
  children: ReactNode
}

const ContentLayout = ({ children }: ContentLayoutProps) => (
  <Box
    sx={{
      "& p": {
        color: "gray.600",
        lineHeight: 1.75,
        marginBottom: 10,
      },
      "& p:last-child": {
        marginBottom: 0,
      },
      "& h1": {
        fontSize: "3xl",
        fontWeight: "semibold",
      },
      "& h2, & h3, & h4, & h5, & h6": {
        fontSize: "2xl",
        marginBottom: 5,
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
      "& ul": {
        color: "gray.600",
        paddingLeft: 4,
        marginBottom: 10,
      },
      "& ul:last-child": {
        marginBottom: 0,
      },
    }}
  >
    {children}
  </Box>
)

export default ContentLayout
