import BottomModal from "@/components/BottomModal"
import IconActionButton from "@/components/IconActionButton"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BiEdit, BiPaperPlane } from "react-icons/bi"

interface OrderConfirmModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  isLoading?: boolean
  address: string
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
        <>
          <Flex position="absolute" top={0} right={0}>
            <IconActionButton
              onClick={() => {
                onClose()
                router.push("/addresses")
              }}
              icon={<BiEdit />}
            />
          </Flex>
          <Heading size="md" mb={2} fontWeight="700">
            Confirme o endereço
          </Heading>
          {address}
        </>
      </Box>
      <Button
        colorScheme="brand"
        onClick={onConfirm}
        mt={4}
        isLoading={isLoading}
        leftIcon={<BiPaperPlane />}
      >
        Enviar pedido
      </Button>
    </BottomModal>
  )
}

export default OrderConfirmModal
