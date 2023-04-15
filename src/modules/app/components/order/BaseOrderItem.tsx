import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

interface BaseOrderItemProps {
  leftSlot: ReactNode
  rightSlot: ReactNode
  alignItems?: string
  onClick?: () => void
  isLast?: boolean
}

const BaseOrderItem = ({
  isLast = false,
  leftSlot,
  rightSlot,
  alignItems = "center",
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
      <Flex
        p={{ base: 4, md: 6 }}
        pt={{ lg: 4 }}
        pb={{ lg: 4 }}
        alignItems={alignItems}
      >
        <Box flex={1}>{leftSlot}</Box>
        <Box flex={1} textAlign="right">
          {rightSlot}
        </Box>
      </Flex>
      {!isLast && (
        <Box pl={{ base: 4, lg: 6 }} pr={{ base: 4, lg: 6 }} background="white">
          <Box
            className="separator"
            height="0.8px"
            width="100%"
            backgroundColor="gray.200"
          />
        </Box>
      )}
    </Box>
  )
}

export default BaseOrderItem
