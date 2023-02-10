import {
  Box,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"

interface OrderOptionsModalProps {
  onClose: () => void
  onEdit: () => void
  onRemove: () => void
  isOpen: boolean
}

const OrderOptionsModal = ({
  isOpen,
  onEdit,
  onRemove,
  onClose,
}: OrderOptionsModalProps) => {
  return (
    <Box
      id="containerModal"
      sx={{ "& .chakra-modal__content": { alignItems: "flex-end" } }}
    >
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent
          paddingBottom="72px"
          position="relative"
          borderRadius={useBreakpointValue({ base: "0", md: "md" })}
          overflow="hidden"
          bottom="0px"
          p={0}
          margin={0}
          alignSelf="flex-end"
        >
          <Box
            onClick={onEdit}
            as="button"
            p={5}
            borderBottom="1px solid transparent"
            borderColor="gray.200"
            textAlign="left"
            outline="none"
          >
            Editar
          </Box>
          <Box
            onClick={onRemove}
            as="button"
            p={5}
            borderBottom="1px solid transparent"
            borderColor="gray.200"
            textAlign="left"
            outline="none"
          >
            Remover
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default OrderOptionsModal
