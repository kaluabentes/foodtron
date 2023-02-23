import BottomModal from "@/components/BottomModal"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useState } from "react"

interface ChangeModalProps {
  onClose: () => void
  onConfirm: (value: string) => void
  isOpen: boolean
}

const ChangeModal = ({ isOpen, onConfirm, onClose }: ChangeModalProps) => {
  const [error, setError] = useState("")
  const [change, setChange] = useState("")

  const clear = () => {
    setError("")
    setChange("")
  }

  const handleConfirm = () => {
    if (!change) {
      setError("Este campo é obrigatório")
      return
    }

    clear()
    onConfirm(change)
  }

  const handleClose = () => {
    clear()
    onClose()
  }

  return (
    <BottomModal isOpen={isOpen} onClose={handleClose} hasPadding>
      <FormControl isInvalid>
        <FormLabel htmlFor="change">Troco pra quanto?</FormLabel>
        <Input
          id="change"
          onChange={(event) => setChange(event.target.value)}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <Button colorScheme="brand" onClick={handleConfirm} mt={4}>
          Confirmar
        </Button>
      </FormControl>
    </BottomModal>
  )
}

export default ChangeModal
