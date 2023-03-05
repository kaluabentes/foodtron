import BottomModal from "@/components/BottomModal"
import { Address } from "@/contexts/app"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BiEdit } from "react-icons/bi"

interface OrderConfirmModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  isLoading?: boolean
  address: Address
}

const OrderConfirmModal = ({
  isOpen,
  isLoading,
  address,
  onConfirm,
  onClose,
}: OrderConfirmModalProps) => {
  const router = useRouter()

  return (
    <BottomModal isOpen={isOpen} onClose={onClose} hasPadding>
      <Box position="relative">
        <Flex
          as="button"
          color="gray.500"
          shadow="md"
          width="22px"
          height="22px"
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={0}
          right={0}
          onClick={() => {
            onClose()
            router.push("/edit-address?redirect=order-confirm")
          }}
        >
          <BiEdit />
        </Flex>
        <Heading size="sm" mb={2} fontWeight="500">
          Entregar em
        </Heading>
        {address.street}, {address.number}, {address.location.neighborhood}
      </Box>
      <Button
        colorScheme="brand"
        onClick={onConfirm}
        mt={4}
        isLoading={isLoading}
      >
        Confirmar
      </Button>
    </BottomModal>
  )
}

export default OrderConfirmModal
