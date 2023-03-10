import Location from "@/modules/locations/types/Location"

interface Address {
  id: string
  street: string
  number: string
  location: Location
}

export default Address
