import { Flex, Icon, Text } from "@chakra-ui/react"
import { BiChevronDown, BiMap } from "react-icons/bi"

const AddressSelectButton = ({ address }: { address: string }) => (
  <Flex as="button" alignItems="center" gap={2} p={3} width="100%">
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
    <Icon
      as={BiChevronDown}
      fontSize="22px"
      justifySelf="flex-end"
      color="gray.500"
    />
  </Flex>
)

export default AddressSelectButton
