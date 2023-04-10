import { Box } from "@chakra-ui/react"

interface StripeSeparatorProps {
  horizontal?: boolean
}

const StripeSeparator = ({ horizontal }: StripeSeparatorProps) => (
  <Box
    width={horizontal ? "100%" : "1px"}
    height={horizontal ? "1px" : "30px"}
    borderRadius="50px"
    backgroundColor="gray.300"
  />
)

export default StripeSeparator
