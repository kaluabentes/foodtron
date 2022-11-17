import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface MenuProps {
  children: ReactNode
}

const Menu = ({ children }: MenuProps) => (
  <Flex
    as="ul"
    direction="column"
    padding={0}
    margin={0}
    gap={2}
    overflowX="hidden"
  >
    {children}
  </Flex>
)

export default Menu
