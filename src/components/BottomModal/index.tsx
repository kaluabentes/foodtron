import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface BottomModalProps {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
  hasPadding?: boolean
}

const BottomModal = ({
  onClose,
  isOpen,
  children,
  hasPadding,
}: BottomModalProps) => (
  <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent
      paddingBottom="72px"
      position="relative"
      borderRadius={useBreakpointValue({ base: "0", md: "md" })}
      overflow="hidden"
      bottom="0px"
      p={hasPadding ? 4 : 0}
      margin={0}
      alignSelf={{ base: "end", md: "center" }}
      mt={{ base: 0, md: "32px" }}
    >
      {children}
    </ModalContent>
  </Modal>
)

export default BottomModal
