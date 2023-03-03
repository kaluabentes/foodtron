import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface BaseOrderItemProps {
  leftSlot: ReactNode
  rightSlot: ReactNode
  onClick?: () => void
}

const BaseOrderItem = ({
  leftSlot,
  rightSlot,
  onClick,
}: BaseOrderItemProps) => {
  return (
    <Box
      sx={{
        "&:last-of-type .separator": {
          display: "none",
        },
      }}
      as={onClick && "button"}
      textAlign="left"
      onClick={onClick}
    >
      <Flex p={{ base: 4, md: 6 }} alignItems="center">
        <Box flex={1}>{leftSlot}</Box>
        <Box flex={1} textAlign="right">
          {rightSlot}
        </Box>
      </Flex>
      <Box pl={4} pr={4} background="white">
        <Box
          className="separator"
          height="0.8px"
          width="100%"
          backgroundColor="gray.100"
        />
      </Box>
    </Box>
  )
}

export default BaseOrderItem
