import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
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
import sumOrderSubtotal from "../../../orders/lib/sumOrderSubtotal"

interface AddressCardProps {
  address: Address
  isSelecting?: boolean
  isDisabled?: boolean
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
  isDisabled,
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
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={1}
      zIndex="20"
      position="relative"
    >
      <Heading fontSize="md" fontWeight="500" color="gray.700">
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
        isDisabled={isDisabled}
      >
        {isDisabled ? "Selecionado" : "Selecionar"}
      </Button>
    </Flex>
    {isDisabled && (
      <Box
        position="absolute"
        height="100%"
        width="3px"
        background="brand.500"
        top="0"
        left="0"
        zIndex="10"
      />
    )}
  </Box>
)

export default AddressCard
