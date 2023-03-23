import Address from "../types/Address"

const formatAddress = (address: Address) =>
  `${address.street || "---"}, ${address.number || "---"}, ${
    address.location?.neighborhood
  }`

export default formatAddress
