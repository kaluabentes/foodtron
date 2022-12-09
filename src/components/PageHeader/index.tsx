import { Box, Flex, Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  actions: ReactNode
}

const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <Flex as="header" justifyContent="space-between" alignItems="center">
    <Heading size="lg" marginBottom={8} fontWeight="semibold" marginTop={8}>
      {title}
    </Heading>
    <Flex>{actions}</Flex>
  </Flex>
)

export default PageHeader
