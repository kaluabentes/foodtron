import QuantitySwitch from "@/components/QuantitySwitch"
import Option from "@/modules/admin/options/types/Option"
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
import { useEffect, useState } from "react"
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
  const [optionGroupValues, setOptionGroupValues] = useState<OptionGroup[]>([])
  const [observation, setObservation] = useState("")
  const [quantity, setQuantity] = useState(0)

  const getTotal = () => {
    if (product) {
      return (Number(product?.price) * quantity).toFixed(2)
    }

    return "0.00"
  }

  const getOptionValue = ({
    optionId,
    optionGroupId,
  }: {
    optionId: string
    optionGroupId: string
  }) => {
    const optionGroup = optionGroupValues.find(
      (optionGroup) => optionGroup.id === optionGroupId
    )
    const option = optionGroup?.options?.find((opt) => opt.id === optionId)

    return Number(option?.value || 0)
  }

  const handleOptionChange = ({
    optionId,
    optionGroupId,
    value,
  }: {
    optionId: string
    optionGroupId: string
    value: number
  }) => {
    setOptionGroupValues((optionGroups) =>
      optionGroups.map((optionGroup: OptionGroup) => {
        if (optionGroupId === optionGroup.id) {
          return {
            ...optionGroup,
            options: optionGroup.options?.map((option) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  value,
                }
              }

              return option
            }),
          }
        }

        return optionGroup
      })
    )
  }

  const handleConfirm = () => {
    console.log({
      optionGroupValues,
      observation,
      quantity,
    })
  }

  useEffect(() => {
    if (optionGroups?.length) {
      setOptionGroupValues(
        optionGroups?.map((optionGroup: OptionGroup) => ({
          ...optionGroup,
          options: optionGroup.options?.map((opt: Option) => ({
            ...opt,
            value: 0,
          })),
        }))
      )
    }
  }, [optionGroups])

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
        <Box p={4} mb={4}>
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
              <Box key={option.id}>
                <Flex
                  p={4}
                  width="full"
                  textAlign="left"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>{option.title}</Box>
                  <QuantitySwitch
                    onChange={(value) =>
                      handleOptionChange({
                        optionId: option.id!,
                        optionGroupId: optionGroup.id!,
                        value,
                      })
                    }
                    value={getOptionValue({
                      optionId: option.id!,
                      optionGroupId: optionGroup.id!,
                    })}
                  />
                </Flex>
                <Box pl={4} pr={4}>
                  <Box height="0.8px" width="100%" backgroundColor="gray.200" />
                </Box>
              </Box>
            ))}
          </Box>
        ))}
        <Box p={4} mt={2}>
          <Heading fontSize="md" fontWeight="500" mb={3}>
            Alguma observação?
          </Heading>
          <Textarea
            onChange={(event) => setObservation(event.target.value)}
            placeholder="Maionese a parte..."
            mb={4}
            value={observation}
          />
          <Flex gap={2}>
            <QuantitySwitch onChange={setQuantity} value={quantity} />
            <Button onClick={handleConfirm} colorScheme="brand" width="full">
              Confirmar: {getTotal()}
            </Button>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default OrderModal
