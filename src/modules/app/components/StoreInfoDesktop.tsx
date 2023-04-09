import Store from "@/modules/admin/stores/types/Store"
import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import Schedule from "./store-info/Schedule"
import MinimumOrderPrice from "./store-info/MinimumOrderPrice"
import Location from "@/modules/admin/locations/types/Location"
import StoreDetails from "./store-info/StoreDetails"

interface StoreInfoDesktopProps {
  store: Store
  onSchedulesClick: () => void
  isEnabled: boolean
  weekDay: string
  schedule: string
  location: Location
  onSelectLocation: () => void
}

const StoreInfoDesktop = ({
  store,
  isEnabled,
  onSchedulesClick,
  weekDay,
  schedule,
  onSelectLocation,
  location,
}: StoreInfoDesktopProps) => (
  <Box background="white" mb={4} borderRadius="md" overflow="hidden">
    <Image
      src={store.cover}
      alt="Cover"
      objectFit="cover"
      height={{ base: "200px" }}
      width="100%"
    />
    <Flex p={6}>
      <Image
        src={store.logo}
        alt="Logo"
        objectFit="cover"
        outline="3px solid white"
        height="130px"
        width="130px"
        borderRadius="25px"
      />
      <Flex direction="column" ml={6}>
        <Heading size="lg" fontWeight="700" mb={2}>
          {store.name}
        </Heading>
        <Schedule
          store={store}
          isEnabled={isEnabled}
          onSchedulesClick={onSchedulesClick}
          weekDay={weekDay}
          schedule={schedule}
        />
        <MinimumOrderPrice store={store} />
        <StoreDetails
          location={location}
          store={store}
          onSelectLocation={onSelectLocation}
          onSchedulesClick={onSchedulesClick}
        />
      </Flex>
    </Flex>
  </Box>
)

export default StoreInfoDesktop
