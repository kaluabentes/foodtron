import Address from "@/modules/app/addresses/types/Address"
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { BiMap, BiTrash } from "react-icons/bi"

interface AddressCardProps {
  address: Address
  isSelecting?: boolean
  isSelected?: boolean
  onEdit?: () => void
  onSelect?: () => void
  onDelete?: () => void
}

const getNeighborhood = (address: string) => {
  const addressParts = address.split(" ")
  return addressParts[addressParts.length - 1]
}

const AddressCard = ({
  address,
  onEdit,
  onSelect,
  isSelecting,
  isSelected,
  onDelete,
}: AddressCardProps) => (
  <Box
    position="relative"
    background="white"
    key={address.id}
    p={4}
    display="block"
    width="100%"
    textAlign="left"
    borderRadius="md"
    shadow="sm"
    overflow="hidden"
    border="3px solid black"
    borderColor={isSelected ? "brand.500" : "transparent"}
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={1}
      zIndex="20"
      position="relative"
    >
      <Heading fontSize="lg" fontWeight="700" color="gray.700">
        {address.street}, {address.number}
      </Heading>
      <IconButton
        onClick={onDelete}
        aria-label="Remover endereço"
        size="sm"
        icon={<BiTrash />}
      />
    </Flex>
    <Flex
      justifyContent="space-between"
      alignItems="start"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Flex gap={1} alignItems="center">
        <Icon color="brand.500" fontSize="20px" as={BiMap} />
        <Text fontWeight="500" fontSize="sm" color="gray.700">
          {address.location?.neighborhood}
        </Text>
      </Flex>
    </Flex>
    <Flex zIndex="20" position="relative" gap={2} alignItems="center">
      <Button
        size="sm"
        onClick={(event) => {
          event.stopPropagation()
          onEdit!()
        }}
        colorScheme="brand"
      >
        Editar
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={(event) => {
          event.stopPropagation()
          onSelect!()
        }}
        isLoading={isSelecting}
        isDisabled={isSelected}
      >
        {isSelected ? "Selecionado" : "Selecionar"}
      </Button>
    </Flex>
  </Box>
)

export default AddressCard
