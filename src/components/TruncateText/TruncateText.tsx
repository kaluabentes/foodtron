import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

const TruncateText = ({ children }: { children: ReactNode }) => (
  <Box as="p" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
    {children}
  </Box>
)

export default TruncateText
