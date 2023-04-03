const getNeighborhood = (address: string) => {
  const addressParts = address.split(",").map((adds) => adds.trim())
  return addressParts[addressParts.length - 1]
}

export default getNeighborhood
