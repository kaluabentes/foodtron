import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiEdit } from "react-icons/bi"

interface EditableDataItemProps {
  field: string
  value: string | ReactNode
  onEdit?: () => void
}

const EditableDataItem = ({ field, value, onEdit }: EditableDataItemProps) => (
  <Box
    as={onEdit && "button"}
    textAlign="left"
    position="relative"
    onClick={onEdit}
    display="block"
    width="100%"
  >
    {onEdit && (
      <Flex
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
