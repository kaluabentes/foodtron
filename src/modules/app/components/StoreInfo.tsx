import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import StripeSeparator from "@/components/StripeSeparator"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Location from "@/modules/admin/locations/types/Location"
import Store from "@/modules/admin/stores/types/Store"
import { Badge, Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { BiTimeFive } from "react-icons/bi"

interface StoreInfoProps {
  store: Store
  weekDay: string
  schedule: string
  isEnabled: boolean
  location: {
    estimatedTime: string
    tax: string
  }
  onSelectLocation: () => void
  onSchedulesClick: () => void
}

const StoreInfo = ({
  store,
  location,
  weekDay,
  schedule,
  isEnabled,
  onSelectLocation,
  onSchedulesClick,
}: StoreInfoProps) => (
  <Box shadow="sm" backgroundColor="white" overflow="hidden">
    <StoreMidiaUpload
      defaultCover={store.cover!}
      defaultLogo={store.logo!}
      isEditable={false}
    />
    <Flex flexDirection="column" alignItems="center" p={4}>
      <Heading
        maxWidth="400px"
        textAlign="center"
        size="lg"
        fontWeight="700"
        mb={8}
      >
        {store.name}
      </Heading>
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
      <Text mb={8}>
        <Box as="span" color="gray.500" fontSize="md">
          Pedido mínimo:
        </Box>{" "}
        <Box as="span" fontWeight="500">
          {formatToRealCurrency(Number(store.minimumOrderPrice))}
        </Box>
      </Text>
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
            <Text
              as="button"
              onClick={onSelectLocation}
              fontWeight="500"
              fontSize="sm"
              color="brand.500"
            >
              Selecionar
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
            <Text
              as="button"
              onClick={onSelectLocation}
              fontWeight="500"
              fontSize="sm"
              color="brand.500"
            >
              Selecionar
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
    </Flex>
  </Box>
)

export default StoreInfo
