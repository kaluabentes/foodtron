import { Flex, Icon, Text } from "@chakra-ui/react"
import { BiChevronDown, BiEdit, BiMap } from "react-icons/bi"

const AddressSelectButton = ({
  address,
  onClick,
  isBordered,
}: {
  address: string | undefined
  onClick: () => void
  isBordered?: boolean
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
    border={{ lg: "2px solid transparent" }}
    _hover={{ borderColor: "brand.500" }}
    borderColor={{ lg: isBordered ? "gray.200" : "none" }}
  >
    <Icon
      as={BiMap}
      color="brand.500"
      fontSize="30px"
      transform="translateY(-4px)"
    />
    <Flex direction="column" alignItems="flex-start" flex={1}>
      <Text fontSize="xs" fontWeight="500">
        Entregar em:
      </Text>
      {address ? (
        <Text fontWeight="400" fontSize="md">
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
