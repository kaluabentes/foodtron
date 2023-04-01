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
  location: {
    estimatedTime: string
    tax: string
  }
  onSelectLocation: () => void
}

const StoreInfo = ({
  store,
  location,
  weekDay,
  schedule,
  onSelectLocation,
}: StoreInfoProps) => (
  <Box shadow="sm" backgroundColor="white" overflow="hidden">
    <StoreMidiaUpload
      defaultCover={store.cover!}
      defaultLogo={store.logo!}
      isEditable={false}
    />
    <Flex flexDirection="column" alignItems="center" p={4}>
      <Heading
        textTransform="uppercase"
        textAlign="center"
        size="lg"
        fontWeight="700"
        mb={8}
      >
        {store.name}
      </Heading>
      <Flex alignItems="center" gap={1.5} mb={2}>
        <Icon fontSize="22px" as={BiTimeFive} />
        <Text as="span" fontWeight="500">
          {weekDay || "---"}
        </Text>
        <Text color="gray.600">{schedule || "---"}</Text>
      </Flex>
      <Text mb={8} fontWeight="500">
        Pedido mínimo:{" "}
        <Box as="span" fontWeight="500">
          {formatToRealCurrency(Number(store.minimumOrderPrice))}
        </Box>
      </Text>
      <Flex gap={6} alignItems="center">
        <Flex direction="column" alignItems="center">
          <Text as="span" fontSize="14px" color="gray.600">
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
          <Text as="span" fontSize="14px" color="gray.600">
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
          <Badge colorScheme="green">Aberto</Badge>
        ) : (
          <Badge colorScheme="red">Fechado</Badge>
        )}
      </Flex>
    </Flex>
  </Box>
)

export default StoreInfo
