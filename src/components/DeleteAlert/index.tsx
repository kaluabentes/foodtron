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

interface DeleteAlertProps {
  title: string
  description: string
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteAlert = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: DeleteAlertProps) => {
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
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={onConfirm}
              ml={3}
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAlert
