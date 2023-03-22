import { Flex, Icon, Text } from "@chakra-ui/react"
import { BiChevronDown, BiEdit, BiMap } from "react-icons/bi"

const AddressSelectButton = ({
  address,
  onClick,
}: {
  address: string
  onClick: () => void
}) => (
  <Flex
    as="button"
    alignItems="center"
    gap={2}
    p={4}
    width="100%"
    onClick={onClick}
    backgroundColor="white"
    mb={{ md: 4 }}
    borderRadius={{ lg: "md" }}
    shadow="sm"
  >
    <Icon as={BiMap} color="brand.500" fontSize="30px" />
    <Flex direction="column" alignItems="flex-start" flex={1}>
      <Text fontSize="xs">Entregar em:</Text>
      {address ? (
        <Text fontWeight="500" fontSize="sm">
          {address}
        </Text>
      ) : (
        <Text fontWeight="500" fontSize="sm" color="brand.500">
          Selecionar
        </Text>
      )}
    </Flex>
    <Icon as={BiEdit} fontSize="20px" justifySelf="flex-end" color="gray.500" />
  </Flex>
)

export default AddressSelectButton
