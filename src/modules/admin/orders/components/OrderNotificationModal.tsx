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
import OrderCard from "./OrderCard"
import EmptyState from "@/components/EmptyState"

interface OrderNotificationModalProps {
  onClose: () => void
  onOrderClick: (order: Order) => void
  isOpen: boolean
  orders: Order[]
}

const OrderNotificationModal = ({
  isOpen,
  orders,
  onClose,
  onOrderClick,
}: OrderNotificationModalProps) => {
  const renderContent = () => {
    if (!orders || !orders.length) {
      return <EmptyState message="Nenhuma novidade por aqui" />
    }

    return orders.map((order: Order) => (
      <OrderCard
        key={order.id}
        onClick={() => onOrderClick(order)}
        onConfirm={() => onOrderClick(order!)}
        order={order}
      />
    ))
  }

  return (
    <Modal
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <Flex
          p={4}
          justifyContent="space-between"
          alignItems="center"
          background="white"
          borderBottom="1px solid black"
          borderColor="gray.200"
        >
          <Heading fontSize="lg" fontWeight="600">
            Novos pedidos
          </Heading>
          <CloseButton onClick={onClose} />
        </Flex>
        <Box p={4} pt={0} pb={0}>
          {renderContent()}
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default OrderNotificationModal
