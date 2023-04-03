import { BiBell } from "react-icons/bi"

import BarIconButton from "../BarIconButton"
import { Box } from "@chakra-ui/react"

interface BellButtonLargeProps {
  count: number
  onClick: () => void
}

const BellButtonLarge = ({ count, onClick }: BellButtonLargeProps) => (
  <Box
    onClick={onClick}
    as="button"
    height="50px"
    width="50px"
    borderRadius="50%"
    background="white"
    display="flex"
    alignItems="center"
    justifyContent="center"
    position="absolute"
    bottom={6}
    right={8}
    color="gray.500"
    boxShadow="md"
  >
    {count > 0 && (
      <Box
        position="absolute"
        right={0}
        top={0}
        zIndex={100}
        background="brand.500"
        color="white"
        height="20px"
        width="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        fontSize="xs"
        fontWeight="500"
      >
        {count}
      </Box>
    )}
    <BiBell fontSize="22px" />
  </Box>
)

export default BellButtonLarge
