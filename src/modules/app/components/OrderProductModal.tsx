import QuantitySwitch from "@/components/QuantitySwitch"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import Option from "@/modules/options/types/Option"
import OptionGroup from "@/modules/options/types/OptionGroup"
import Product from "@/modules/products/types/Product"
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BiX } from "react-icons/bi"

export interface OrderProductValues {
  id?: string
  optionGroupValues: OptionGroup[]
  observation: string
  quantity: number
}

interface OrderProductModalProps {
  onClose: () => void
  isOpen: boolean
  product?: Product
  onConfirm: (values: OrderProductValues) => void
  optionGroups?: OptionGroup[]
}

const OrderProductModal = ({
  onClose,
  isOpen,
  product,
  onConfirm,
  optionGroups,
}: OrderProductModalProps) => {
  const [optionGroupValues, setOptionGroupValues] = useState<OptionGroup[]>([])
  const [observation, setObservation] = useState("")
  const [quantity, setQuantity] = useState(1)

  const getIsButtonDisabled = () => {
    const requiredOptionGroups = optionGroupValues.filter(
      (optionGroup) => optionGroup.required
    )

    const hasOptionGroupsUnselected = requiredOptionGroups.some(
      (optionGroup) => {
        const optionsWithQuantity = optionGroup.options!.filter(
          (option) => option.quantity! > 0
        )

        return optionsWithQuantity.length === 0
      }
    )

    return hasOptionGroupsUnselected
  }

  const getTotal = (): number => {
    const optionsTotal = optionGroupValues.reduce((subtotal, optionGroup) => {
      const totalChild = optionGroup.options!.reduce(
        (subtotalChild, option: Option) => {
          if (option.quantity! > 0) {
            return (
              Number(option.quantity) * Number(option.price) + subtotalChild
            )
          }

          return subtotalChild
        },
        0
      )

      return totalChild + subtotal
    }, 0)

    if (product) {
      return Number(product?.price) * quantity + optionsTotal
    }

    return 0
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

    return Number(option?.quantity || 0)
  }

  const getOptionTotalQuantity = (optionGroupId: string) => {
    const optionGroup = optionGroupValues.find(
      (optionGroup) => optionGroup.id === optionGroupId
    )
    const totalQuantity = optionGroup?.options!.reduce(
      (total, option) => total + option.quantity!,
      0
    )

    return totalQuantity
  }

  const handleOptionChange = ({
    optionId,
    optionGroupId,
    quantity,
  }: {
    optionId: string
    optionGroupId: string
    quantity: number
  }) => {
    const optionGroup = optionGroupValues.find(
      (optionGroup) => optionGroup.id === optionGroupId
    )
    const option = optionGroup?.options!.find((opt) => opt.id === optionId)
    const totalQuantity = optionGroup?.options!.reduce(
      (total, opt) => total + opt.quantity!,
      0
    )

    if (
      totalQuantity! + 1 > Number(optionGroup?.maxOption) &&
      quantity >= option?.quantity!
    )
      return

    setOptionGroupValues((optionGroups) =>
      optionGroups.map((optionGroup: OptionGroup) => {
        if (optionGroupId === optionGroup.id) {
          return {
            ...optionGroup,
            options: optionGroup.options?.map((option) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  quantity,
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

  const clear = () => {
    setObservation("")
    setOptionGroupValues([])
    setQuantity(1)
  }

  const handleClose = () => {
    clear()
    onClose()
  }

  const handleConfirm = () => {
    clear()
    onConfirm({
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
            quantity: opt.quantity || 0,
          })),
        }))
      )
    }
  }, [optionGroups])

  return (
    <Modal
      onClose={handleClose}
      size={{ base: "full", md: "lg" }}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        paddingBottom="73px"
        position="relative"
        height={{ base: "100%", md: "85%" }}
        borderRadius={useBreakpointValue({ base: "0", md: "md" })}
        overflow="hidden"
      >
        <Box overflow="auto">
          <Image
            src={product?.image ? product?.image : "/placeholder.png"}
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
            onClick={handleClose}
            shadow="md"
          />
          <Box p={4} mb={4}>
            <Heading mb={1} fontSize="lg" fontWeight="500">
              {product?.title}
            </Heading>
            <Text mb={2} color="gray.500" fontSize="sm">
              {product?.description}
            </Text>
            <Text fontWeight="500" fontSize="md">
              {formatToRealCurrency(Number(product?.price))}
            </Text>
          </Box>
          {optionGroups?.map((optionGroup: OptionGroup) => (
            <Box key={optionGroup.id}>
              <Flex
                backgroundColor="gray.100"
                p={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Heading fontSize="md" fontWeight="500">
                    {optionGroup.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {getOptionTotalQuantity(String(optionGroup.id))} de{" "}
                    {optionGroup.maxOption}
                  </Text>
                </Box>
                {optionGroup.required && (
                  <Badge
                    background="gray.600"
                    color="white"
                    fontWeight="500"
                    pt="2px"
                    pr="5px"
                    pl="5px"
                    pb="2px"
                    fontSize="10px"
                  >
                    Obrigatório
                  </Badge>
                )}
              </Flex>
              {optionGroup.options?.map((option) => (
                <Box key={option.id}>
                  <Flex
                    p={4}
                    width="full"
                    textAlign="left"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Box mb={1} fontSize="sm">
                        {option.title}
                      </Box>
                      <Text fontSize="sm" color="gray.500">
                        {option.price
                          ? `+ ${formatToRealCurrency(Number(option.price))}`
                          : ""}
                      </Text>
                    </Box>
                    <QuantitySwitch
                      onChange={(quantity) =>
                        handleOptionChange({
                          optionId: option.id!,
                          optionGroupId: optionGroup.id!,
                          quantity,
                        })
                      }
                      value={getOptionValue({
                        optionId: option.id!,
                        optionGroupId: optionGroup.id!,
                      })}
                      max={Number(optionGroup.maxOption)}
                    />
                  </Flex>
                  <Box pl={4} pr={4}>
                    <Box
                      height="0.8px"
                      width="100%"
                      backgroundColor="gray.200"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
          <Box p={4}>
            <Heading fontSize="md" fontWeight="500" mb={3}>
              Alguma observação?
            </Heading>
            <Textarea
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Maionese a parte..."
              value={observation}
            />
          </Box>
        </Box>
        <Flex
          gap={2}
          p={4}
          position="absolute"
          bottom="0"
          width="full"
          background="white"
          shadow="md"
          borderTop="1px solid transparent"
          borderColor="gray.200"
        >
          <QuantitySwitch onChange={setQuantity} value={quantity} min={1} />
          <Button
            disabled={getIsButtonDisabled()}
            onClick={handleConfirm}
            colorScheme="brand"
            width="full"
          >
            Confirmar: {formatToRealCurrency(getTotal())}
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default OrderProductModal
