import IconActionButton from "@/components/IconActionButton"
import { Box, Flex, FormLabel, Input } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { BiTrash } from "react-icons/bi"

interface OptionInputCardProps {
  onRemove: () => void
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onPriceChange: (event: ChangeEvent<HTMLInputElement>) => void
  title: string
  price: string
}

const OptionInputCard = ({
  onTitleChange,
  onPriceChange,
  title,
  price,
  onRemove,
}: OptionInputCardProps) => (
  <Flex
    gap={4}
    p={4}
    border="1px solid transparent"
    borderColor="gray.200"
    borderRadius="md"
    position="relative"
  >
    <Box flex={1}>
      <FormLabel>Título</FormLabel>
      <Input value={title} onChange={onTitleChange} />
    </Box>
    <Box flex={1}>
      <FormLabel>Preço</FormLabel>
      <Input value={price} onChange={onPriceChange} />
    </Box>
    <Box position="absolute" top={2} right={2}>
      <IconActionButton onClick={onRemove} icon={<BiTrash />} />
    </Box>
  </Flex>
)

export default OptionInputCard
