import Store from "@/modules/admin/stores/types/Store"
import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import Schedule from "./store-info/Schedule"
import MinimumOrderPrice from "./store-info/MinimumOrderPrice"
import Location from "@/modules/admin/locations/types/Location"
import StoreDetails from "./store-info/StoreDetails"
import IconActionButton from "@/components/IconActionButton"
import { BiInfoCircle } from "react-icons/bi"

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
  <Box
    background="white"
    mb={4}
    borderRadius="md"
    overflow="hidden"
    shadow="sm"
  >
    <Image
      src={store.cover}
      alt="Cover"
      objectFit="cover"
      height={{ base: "300px" }}
      width="100%"
    />
    <Flex p={6}>
      <Image
        marginTop="-50px"
        src={store.logo}
        alt="Logo"
        objectFit="cover"
        outline="3px solid white"
        height="160px"
        width="160px"
        borderRadius="2xl"
      />
      <Flex direction="column" ml={6} width="100%">
        <Flex
          alignItems="center"
          gap={4}
          mb={4}
          justifyContent="space-between"
          width="100%"
        >
          <Heading size="lg" fontWeight="700">
            {store.name}
          </Heading>
          <IconActionButton icon={<BiInfoCircle />} />
        </Flex>
        <Flex
          alignItems="center"
          gap={4}
          mb={6}
          justifyContent="space-between"
          width="100%"
        >
          <Schedule
            store={store}
            isEnabled={isEnabled}
            onSchedulesClick={onSchedulesClick}
            weekDay={weekDay}
            schedule={schedule}
          />
          <MinimumOrderPrice store={store} />
        </Flex>
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
