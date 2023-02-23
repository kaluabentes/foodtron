import { Box } from "@chakra-ui/react"

interface StripeSeparatorProps {
  vertical?: boolean
}

const StripeSeparator = ({ vertical }: StripeSeparatorProps) => (
  <Box
    width={vertical ? "100%" : "1px"}
    height={vertical ? "1px" : "30px"}
    borderRadius="50px"
    backgroundColor="gray.200"
  />
)

export default StripeSeparator
