import { BiBell } from "react-icons/bi"

import BarIconButton from "../BarIconButton"
import { Box } from "@chakra-ui/react"

interface BellButtonProps {
  count: number
  onClick: () => void
}

const BellButton = ({ count, onClick }: BellButtonProps) => (
  <Box position="relative">
    {count && (
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
    <BarIconButton onClick={onClick} label="Menu" icon={<BiBell />} />
  </Box>
)

export default BellButton
