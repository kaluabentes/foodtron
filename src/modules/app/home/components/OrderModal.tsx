import QuantitySwitch from "@/components/QuantitySwitch"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"
import Product from "@/modules/admin/products/types/Product"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { BiX } from "react-icons/bi"

interface OrderModalProps {
  onClose: () => void
  isOpen: boolean
  product?: Product
  optionGroups?: OptionGroup[]
}

const OrderModal = ({
  onClose,
  isOpen,
  product,
  optionGroups,
}: OrderModalProps) => {
  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Image
          src={product?.image}
          width="100%"
          height="350px"
          objectFit="cover"
        />
        <IconButton
          left={4}
          top={4}
          position="absolute"
          borderRadius="50%"
          aria-label="Remover localização"
          icon={<BiX size="30px" />}
          size="sm"
          onClick={onClose}
        />
        <Box p={4}>
          <Heading mb={1} fontSize="lg" fontWeight="500">
            {product?.title}
          </Heading>
          <Text mb={2} color="gray.500" fontSize="sm">
            {product?.description}
          </Text>
          <Text fontWeight="500" fontSize="md">
            {product?.price}
          </Text>
        </Box>
        {optionGroups?.map((optionGroup) => (
          <Box key={optionGroup.id}>
            <Heading
              backgroundColor="gray.100"
              p={4}
              fontSize="sm"
              textTransform="uppercase"
            >
              {optionGroup.title}
            </Heading>
            {optionGroup.options?.map((option) => (
              <>
                <Flex
                  p={4}
                  width="full"
                  textAlign="left"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>{option.title}</Box>
                  <QuantitySwitch
                    onChange={(value) => console.log(value)}
                    value={0}
                  />
                </Flex>
                <Box pl={4} pr={4}>
                  <Box height="0.8px" width="100%" backgroundColor="gray.200" />
                </Box>
              </>
            ))}
          </Box>
        ))}
        <Box p={4} mt={2}>
          <Heading fontSize="md" fontWeight="500" mb={3}>
            Alguma observação?
          </Heading>
          <Textarea placeholder="Maionese a parte..." />
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default OrderModal
