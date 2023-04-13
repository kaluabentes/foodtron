import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import StripeSeparator from "@/components/StripeSeparator"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Location from "@/modules/admin/locations/types/Location"
import Store from "@/modules/admin/stores/types/Store"
import { Badge, Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"
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
    <StoreMidiaUpload
      defaultCover={store.cover!}
      defaultLogo={store.logo!}
      isEditable={false}
    />
    <Flex flexDirection="column" alignItems="center" p={6}>
      <Flex gap={2} alignItems="center" mb={4}>
        <Heading maxWidth="400px" textAlign="center" size="lg" fontWeight="700">
          {store.name}
        </Heading>
      </Flex>
      <Box mb={2}>
        <Schedule
          store={store}
          isEnabled={isEnabled}
          onSchedulesClick={onInfoClick}
          weekDay={weekDay}
          schedule={schedule}
        />
      </Box>
      <Box mb={6}>
        <MinimumOrderPrice store={store} />
      </Box>
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
