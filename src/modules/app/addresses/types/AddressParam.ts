import Location from "@/modules/admin/locations/types/Location"

interface AddressParam {
  id?: string
  street?: string
  number?: string
  location?: Location
}

export default AddressParam
