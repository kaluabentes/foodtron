import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { ORDER_STATUS, ORDER_STATUS_TEXT } from "../constants"

interface OrderStatusEditProps {
  title: string
  isOpen: boolean
  isLoading?: boolean
  defaultStatus: string
  onClose: () => void
  onConfirm: (status: string) => void
}

const OrderStatusEdit = ({
  title,
  isOpen,
  isLoading,
  defaultStatus,
  onClose,
  onConfirm,
}: OrderStatusEditProps) => {
  const cancelRef = useRef(null)
  const [status, setStatus] = useState(defaultStatus)

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
            <Select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value={ORDER_STATUS.CANCELLED}>
                {ORDER_STATUS_TEXT[ORDER_STATUS.CANCELLED]}
              </option>
              <option value={ORDER_STATUS.DELIVERY}>
                {ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERY]}
              </option>
              <option value={ORDER_STATUS.PENDING}>
                {ORDER_STATUS_TEXT[ORDER_STATUS.PENDING]}
              </option>
              <option value={ORDER_STATUS.DOING}>
                {ORDER_STATUS_TEXT[ORDER_STATUS.DOING]}
              </option>
              <option value={ORDER_STATUS.DONE}>
                {ORDER_STATUS_TEXT[ORDER_STATUS.DONE]}
              </option>
            </Select>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button disabled={isLoading} ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="brand"
              onClick={() => onConfirm(status)}
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

export default OrderStatusEdit
