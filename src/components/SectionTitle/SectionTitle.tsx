import { Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
  isBorderless?: boolean
}

const SectionTitle = ({
  children,
  isBorderless = false,
}: SectionTitleProps) => (
  <Heading
    p={{ base: 4, md: 6 }}
    pt={{ base: 4, md: 4 }}
    pb={{ base: 0, md: 2 }}
    fontSize="17px"
    fontWeight="500"
    borderBottom={!isBorderless ? "1px solid transparent" : undefined}
    borderColor="gray.200"
    background="white"
  >
    {children}
  </Heading>
)

export default SectionTitle
