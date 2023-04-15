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

interface OrderDetailsModalProps {
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
}: OrderDetailsModalProps) => (
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
        background="white"
        borderBottom="1px solid black"
        borderColor="gray.200"
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
      {actions && <Box p={{ base: 4, md: 6 }}>{actions}</Box>}
    </ModalContent>
  </Modal>
)

export default OrderDetailsModal
