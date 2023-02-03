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
  min?: number
  max?: number
}

const QuantitySwitch = ({ value, onChange, min, max }: QuantitySwitchProps) => {
  const handleChange = (nextValue: number) => {
    if (nextValue < 0) return
    if (min && nextValue < min) return
    if (max && nextValue > max) return

    onChange(nextValue)
  }

  return (
    <Flex alignItems="center">
      <SwitchButton
        onClick={() => handleChange(value - 1)}
        icon={<BiMinus />}
      />
      <Box p={2}>{value}</Box>
      <SwitchButton onClick={() => handleChange(value + 1)} icon={<BiPlus />} />
    </Flex>
  )
}

export default QuantitySwitch
