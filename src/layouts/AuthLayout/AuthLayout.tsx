import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  isLarge?: boolean
}

const AuthLayout = ({ children, isLarge = false }: AuthLayoutProps) => (
  <Flex
    justifyContent="center"
    paddingTop={{ base: 0, sm: 10 }}
    paddingBottom={{ base: 0, sm: 10 }}
  >
    <Box
      overflowY={{ base: "auto", sm: "initial" }}
      width="100%"
      maxWidth={isLarge ? "600px" : "448px"}
      backgroundColor={useColorModeValue("white", "gray.800")}
      padding={{ base: 5, sm: 8 }}
      boxShadow={{ base: "none", sm: "sm" }}
      borderRadius={{ base: "none", sm: 10 }}
    >
      {children}
    </Box>
  </Flex>
)

export default AuthLayout
