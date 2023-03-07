import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import Order from "../types/Order"
import OrderDetails from "./OrderDetails"

interface OrderDetailsModal {
  order: Order
  actions?: ReactNode
  onClose: () => void
  onConfirm?: () => void
  isOpen: boolean
  isConfirming?: boolean
}

const OrderDetailsModal = ({
  order,
  actions,
  isOpen,
  onClose,
  onConfirm,
  isConfirming,
}: OrderDetailsModal) => (
  <Modal
    onClose={onClose}
    size={{ base: "full", md: "lg" }}
    isOpen={isOpen}
    motionPreset="slideInBottom"
  >
    <ModalOverlay />
    <ModalContent>
      <Flex
        p={4}
        justifyContent="space-between"
        alignItems="center"
        background="gray.50"
      >
        <Heading fontSize="lg" fontWeight="600">
          Detalhes do pedido
        </Heading>
        <CloseButton onClick={onClose} />
      </Flex>
      <OrderDetails
        isConfirming={isConfirming}
        onConfirm={onConfirm}
        order={order}
      />
      {actions && <Box p={{ base: 4, md: 8 }}>{actions}</Box>}
    </ModalContent>
  </Modal>
)

export default OrderDetailsModal
