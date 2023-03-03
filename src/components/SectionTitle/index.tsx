import { Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <Heading
    backgroundColor="white"
    p={4}
    fontSize="sm"
    fontWeight="700"
    textTransform="uppercase"
    borderBottom="1px solid transparent"
    borderColor="gray.100"
    background="gray.50"
  >
    {children}
  </Heading>
)

export default SectionTitle
