import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"

interface EditableDataItemProps {
  field: string
  value: string
  onEdit?: () => void
}

const EditableDataItem = ({ field, value, onEdit }: EditableDataItemProps) => (
  <Box position="relative">
    {onEdit && (
      <Flex
        as="button"
        color="gray.500"
        shadow="md"
        width="22px"
        height="22px"
        borderRadius="50%"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top={0}
        right={0}
        onClick={onEdit}
      >
        <BiEdit />
      </Flex>
    )}
    <Heading size="xs" mb={2} fontWeight="500">
      {field}
    </Heading>
    <Text>{value}</Text>
  </Box>
)

export default EditableDataItem
