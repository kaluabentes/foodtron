import { useAppContext } from "@/contexts/app"

const useCurrentAddress = () => {
  const {
    state: {
      user: { addresses, selectedAddressId },
    },
  } = useAppContext()

  const currentAddress = addresses.find((addr) => addr.id === selectedAddressId)

  return currentAddress
}

export default useCurrentAddress
