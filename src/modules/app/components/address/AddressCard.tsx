import formatDate from "@/lib/helpers/date/formatDate"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Address from "@/modules/addresses/types/Address"
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
}: AddressCardProps) => (
  <Box
    background="white"
    key={address.id}
    p={4}
    position="relative"
    display="block"
    width="100%"
    textAlign="left"
    borderRadius="md"
    shadow="sm"
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Badge>ID: {address.id}</Badge>
      <IconButton aria-label="Remover endereço" size="sm" icon={<BiTrash />} />
    </Flex>
    <Flex
      justifyContent="space-between"
      alignItems="start"
      mb={4}
      zIndex="20"
      position="relative"
    >
      <Box>
        <Heading fontSize="lg" fontWeight="700" mb={1}>
          {address.street}, {address.number}
        </Heading>
      </Box>
      <Flex gap={1} alignItems="center">
        <Icon color="brand.500" fontSize="20px" as={BiMap} />
        <Text fontWeight="500" fontSize="sm">
          {address.location.neighborhood}
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
  </Box>
)

export default AddressCard
