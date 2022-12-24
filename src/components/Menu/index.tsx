import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface MenuProps {
  children: ReactNode
  isFixed?: boolean
  position?: "bottom" | "top"
}

const Menu = ({
  children,
  isFixed = false,
  position = "bottom",
}: MenuProps) => (
  <Flex
    as="ul"
    direction="column"
    padding={0}
    margin={0}
    gap={2}
    overflowX="hidden"
    position={isFixed ? "fixed" : "static"}
    top={position === "top" ? "0px" : "initial"}
    bottom={position === "bottom" ? "0px" : "initial"}
  >
    {children}
  </Flex>
)

export default Menu
