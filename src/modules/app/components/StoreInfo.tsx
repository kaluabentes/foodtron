import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import StripeSeparator from "@/components/StripeSeparator"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Location from "@/modules/admin/locations/types/Location"
import Store from "@/modules/admin/stores/types/Store"
import { Badge, Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { BiInfoCircle, BiTimeFive } from "react-icons/bi"
import Schedule from "./store-info/Schedule"
import MinimumOrderPrice from "./store-info/MinimumOrderPrice"
import StoreDetails from "./store-info/StoreDetails"
import IconActionButton from "@/components/IconActionButton"

interface StoreInfoProps {
  store: Store
  weekDay: string
  schedule: string
  isEnabled: boolean
  location: Location
  onSelectLocation: () => void
  onInfoClick: () => void
}

const StoreInfo = ({
  store,
  location,
  weekDay,
  schedule,
  isEnabled,
  onSelectLocation,
  onInfoClick,
}: StoreInfoProps) => (
  <Box shadow="sm" backgroundColor="white" overflow="hidden">
    <Image
      src={store.cover}
      alt="Cover"
      objectFit="cover"
      height={{ base: "110px" }}
      width="100%"
    />
    <Flex p={4} direction="column" pt={3} gap={0}>
      <Flex alignItems="start" mb={2}>
        <Image
          marginTop="-50px"
          src={store.logo}
          alt="Logo"
          objectFit="cover"
          outline="3px solid white"
          height="110px"
          width="110px"
          borderRadius="2xl"
        />
        <Heading size="lg" ml={4} fontWeight="600">
          {store.name}
        </Heading>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Schedule
          store={store}
          isEnabled={isEnabled}
          onSchedulesClick={onInfoClick}
          weekDay={weekDay}
          schedule={schedule}
        />
        <MinimumOrderPrice store={store} />
      </Flex>
      <StoreDetails
        location={location}
        store={store}
        onSelectLocation={onSelectLocation}
        onSchedulesClick={onInfoClick}
      />
    </Flex>
  </Box>
)

export default StoreInfo
