import {
  Box,
  Flex,
  Skeleton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface DataItemProps {
  label: string
  value: ReactNode
}

const DataItem = ({ label, value }: DataItemProps) => (
  <Flex
    borderBottom={useColorModeValue(
      "1px solid rgba(0, 0, 0, 0.1)",
      "1px solid rgba(219, 218, 218, 0.1)"
    )}
    paddingBottom={5}
    paddingTop={5}
    _last={{ borderBottom: "none" }}
  >
    <Box width="30%">
      <Text fontWeight="600">{label}</Text>
    </Box>
    <Box width="70%">
      <Text color="gray.500" fontSize="md">
        {value}
      </Text>
    </Box>
  </Flex>
)

export default DataItem
