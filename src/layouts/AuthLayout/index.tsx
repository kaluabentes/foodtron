import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  isLarge?: boolean
}

const AuthLayout = ({ children, isLarge = false }: AuthLayoutProps) => (
  <Box height="100vh" overflowY="auto">
    <Flex
      justifyContent="center"
      paddingTop={{ base: 0, sm: 10 }}
      paddingBottom={{ base: 0, sm: 10 }}
    >
      <Box
        height={{ base: "100vh", sm: "initial" }}
        overflowY={{ base: "auto", sm: "initial" }}
        width="100%"
        maxWidth={isLarge ? "600px" : "448px"}
        backgroundColor={useColorModeValue("white", "gray.800")}
        padding={{ base: 5, sm: 10 }}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        borderRadius={{ base: "none", sm: 10 }}
      >
        {children}
      </Box>
    </Flex>
  </Box>
)

export default AuthLayout
