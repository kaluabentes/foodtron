import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"

interface ConfirmAlertProps {
  title: string
  description: string
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmAlert = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmAlertProps) => {
  const cancelRef = useRef(null)

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

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
            >
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmAlert
