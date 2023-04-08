import { Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <Heading
    backgroundColor="white"
    p={{ base: 4, md: 6 }}
    pt={{ base: 4, md: 4 }}
    pb={{ base: 4, md: 4 }}
    fontSize="17px"
    fontWeight="700"
    borderBottom="1px solid transparent"
    borderColor="gray.100"
    background="gray.50"
  >
    {children}
  </Heading>
)

export default SectionTitle
