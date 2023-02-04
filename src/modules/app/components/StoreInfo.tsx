import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import StripeSeparator from "@/components/StripeSeparator"
import Location from "@/modules/locations/types/Location"
import Store from "@/modules/store/types/Store"
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
      <Heading textAlign="center" size="md" fontWeight="500" mb={2}>
        {store.name}
      </Heading>
      <Text textAlign="center" color="gray.500" fontSize="sm" mb={5}>
        {store.category}
      </Text>
      <Flex alignItems="center" gap={2} mb={5}>
        <Icon as={BiTimeFive} />
        <Text as="span" fontWeight="500" lineHeight="0px">
          {weekDay || "---"}
        </Text>
        <Text color="gray.600" lineHeight="0px">
          {schedule || "---"}
        </Text>
      </Flex>
      <Flex gap={4} alignItems="center">
        <Flex direction="column" alignItems="center">
          <Text as="span" fontSize="14px">
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
          {location.estimatedTime && (
            <Text
              as="button"
              onClick={onSelectLocation}
              fontWeight="500"
              fontSize="xs"
              color="brand.500"
            >
              Trocar
            </Text>
          )}
        </Flex>
        <StripeSeparator />
        <Flex direction="column" alignItems="center">
          <Text as="span" fontSize="14px">
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
          {location.tax && (
            <Text
              as="button"
              onClick={onSelectLocation}
              fontWeight="500"
              fontSize="xs"
              color="brand.500"
            >
              Trocar
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

      {/* <Button colorScheme="whatsapp" width="full" leftIcon={<BsWhatsapp />}>
            Conversar
          </Button> */}
    </Flex>
  </Box>
)

export default StoreInfo
