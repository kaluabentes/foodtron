import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"
import { useRef, useState } from "react"

interface OrderCancelConfirmProps {
  title: string
  description: string
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

const OrderCancelConfirm = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: OrderCancelConfirmProps) => {
  const cancelRef = useRef(null)
  const [reason, setReason] = useState<string | undefined>()

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <FormLabel>Motivo</FormLabel>
            <Textarea
              onChange={(event) => setReason(event.target.value)}
              value={reason}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={() => onConfirm(reason!)}
              ml={3}
              isDisabled={!reason}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default OrderCancelConfirm
