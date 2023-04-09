import { Flex, Icon, Text } from "@chakra-ui/react"
import { BiTimeFive } from "react-icons/bi"

import Store from "@/modules/admin/stores/types/Store"

interface ScheduleProps {
  onSchedulesClick: () => void
  store: Store
  isEnabled: boolean
  weekDay: string
  schedule: string
}

const Schedule = ({
  onSchedulesClick,
  store,
  isEnabled,
  weekDay,
  schedule,
}: ScheduleProps) => (
  <Flex
    as="button"
    onClick={onSchedulesClick}
    alignItems="center"
    gap={1.5}
    mb={2}
    textDecoration={store.isOpen && isEnabled ? undefined : "line-through"}
  >
    <Icon fontSize="22px" as={BiTimeFive} color="gray.500" />
    <Text fontWeight="500">
      {!weekDay ? "--- - ---" : `${weekDay} - ${schedule}`}
    </Text>
  </Flex>
)

export default Schedule
