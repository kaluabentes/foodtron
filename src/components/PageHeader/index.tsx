import { Box, Flex, Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  actions?: ReactNode
}

const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <Flex
    as="header"
    justifyContent="space-between"
    alignItems="center"
    paddingTop={5}
    paddingBottom={5}
  >
    <Heading size="lg" fontWeight="semibold" color="gray.700">
      {title}
    </Heading>
    {actions && <Flex>{actions}</Flex>}
  </Flex>
)

export default PageHeader
