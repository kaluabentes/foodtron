import StripeSeparator from "@/components/StripeSeparator"
import Location from "@/modules/admin/locations/types/Location"
import Store from "@/modules/admin/stores/types/Store"
import { Badge, Flex, Text } from "@chakra-ui/react"

interface StoreDetailsProps {
  location: Location
  store: Store
  onSelectLocation: () => void
  onSchedulesClick: () => void
}

const StoreDetails = ({
  location,
  store,
  onSelectLocation,
  onSchedulesClick,
}: StoreDetailsProps) => (
  <Flex gap={6} alignItems="center">
    <Flex direction="column" alignItems="center">
      <Text as="span" fontSize="14px" color="gray.500">
        Tempo
      </Text>
      {location.estimatedTime ? (
        <Text as="span" fontWeight="500">
          {location.estimatedTime} Min.
        </Text>
      ) : (
        <Text as="span" fontWeight="500">
          ---
        </Text>
      )}
    </Flex>
    <StripeSeparator />
    <Flex direction="column" alignItems="center">
      <Text as="span" fontSize="14px" color="gray.500">
        Taxa
      </Text>
      {location.tax ? (
        <Text as="span" fontWeight="500">
          {`R$ ${Number(location.tax).toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}`}
        </Text>
      ) : (
        <Text as="span" fontWeight="500">
          ---
        </Text>
      )}
    </Flex>
    <StripeSeparator />
    {store.isOpen ? (
      <Badge as="button" onClick={onSchedulesClick} colorScheme="green">
        Aberto
      </Badge>
    ) : (
      <Badge as="button" onClick={onSchedulesClick} colorScheme="red">
        Fechado
      </Badge>
    )}
  </Flex>
)

export default StoreDetails
