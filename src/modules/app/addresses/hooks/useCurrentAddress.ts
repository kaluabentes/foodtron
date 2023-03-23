import { useAppContext } from "@/contexts/app"
import Address from "../types/Address"

const useCurrentAddress = () => {
  const {
    state: {
      user: { addresses, selectedAddressId },
    },
  } = useAppContext()

  const currentAddress = addresses.find((addr) => addr.id === selectedAddressId)

  return currentAddress as Address
}

export default useCurrentAddress
