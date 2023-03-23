import { Box, Spinner } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ActionButtonProps {
  children: ReactNode
  isLoading?: boolean
  onClick?: () => void
}

const ActionButton = ({ children, isLoading, onClick }: ActionButtonProps) => (
  <Box
    as="button"
    padding="0"
    margin="0"
    background="brand.400"
    color="white"
    height="60px"
    width="60px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    transition="0.2s"
    position="fixed"
    bottom="16px"
    right="16px"
    zIndex="100"
    shadow="md"
    _focus={{ outline: "none" }}
    _hover={{ background: "brand.600" }}
    _active={{ background: "brand.700" }}
  >
    {isLoading ? <Spinner /> : children}
  </Box>
)

export default ActionButton
