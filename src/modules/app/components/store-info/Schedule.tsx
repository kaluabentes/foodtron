import { Flex, Icon, Text } from "@chakra-ui/react"
import { BiTimeFive } from "react-icons/bi"

interface ScheduleProps {
  onSchedulesClick: () => void
  isEnabled: boolean
  weekDay: string
  schedule: string
}

const Schedule = ({
  onSchedulesClick,
  isEnabled,
  weekDay,
  schedule,
}: ScheduleProps) => (
  <Flex as="button" onClick={onSchedulesClick} alignItems="center" gap={1}>
    <Icon color="gray.500" fontSize="22px" as={BiTimeFive} />
    <Text>
      {!isEnabled ? "----" : !weekDay ? "--- - ---" : `${weekDay}, ${schedule}`}
    </Text>
  </Flex>
)

export default Schedule
