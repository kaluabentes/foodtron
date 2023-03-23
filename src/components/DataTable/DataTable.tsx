import { Box, Flex } from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const DataCell = ({ children }: Props) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    borderBottom="1px solid #fff"
    borderColor="gray.100"
    alignItems="center"
  >
    {children}
  </Flex>
)

export const DataHead = ({ children }: Props) => (
  <Box
    p={{ base: "16px 24px 0px 24px", md: "16px 24px" }}
    width={{ base: "100%", md: "50%" }}
    mb={{ base: "8px", md: "0px" }}
  >
    {children}
  </Box>
)

export const DataValue = ({ children }: Props) => (
  <Box
    p={{ base: "0px 24px 16px 24px", md: "16px 24px" }}
    width={{ base: "100%", md: "50%" }}
  >
    {children}
  </Box>
)
