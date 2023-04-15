import BottomModal from "@/components/BottomModal"
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
    <BottomModal isOpen={isOpen} onClose={onClose}>
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
    </BottomModal>
  )
}

export default OrderOptionsModal
