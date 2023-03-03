import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import Order from "../types/Order"
import OrderDetails from "./OrderDetails"

interface OrderDetailsModal {
  order: Order
  onClose: () => void
  isOpen: boolean
}

const OrderDetailsModal = ({ order, onClose, isOpen }: OrderDetailsModal) => (
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
        <Heading fontSize="lg">Detalhes do pedido</Heading>
        <CloseButton onClick={onClose} />
      </Flex>
      <OrderDetails order={order} />
    </ModalContent>
  </Modal>
)

export default OrderDetailsModal
