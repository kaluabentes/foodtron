import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"

interface SwitchButtonProps {
  icon: ReactNode
  onClick: () => void
}

const SwitchButton = ({ icon, onClick }: SwitchButtonProps) => (
  <Box as="button" onClick={onClick} p={2}>
    {icon}
  </Box>
)

interface QuantitySwitchProps {
  value: number
  onChange: (value: number) => void
}

const QuantitySwitch = ({ value, onChange }: QuantitySwitchProps) => (
  <Flex alignItems="center">
    <SwitchButton onClick={() => onChange(value - 1)} icon={<BiMinus />} />
    <Box p={2}>{value}</Box>
    <SwitchButton onClick={() => onChange(value + 1)} icon={<BiPlus />} />
  </Flex>
)

export default QuantitySwitch
