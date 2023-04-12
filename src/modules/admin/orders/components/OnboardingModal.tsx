import Link from "@/components/Link"
import { useAdminContext } from "@/contexts/admin"
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const router = useRouter()

  const { mutateState, state } = useAdminContext()

  const handleConfigClick = () => {
    mutateState({
      ...state,
      onboardingDone: true,
    })
    router.push("/admin/settings")
  }

  return (
    <Modal
      size={{ base: "full", lg: "lg" }}
      onClose={onClose}
      isOpen={!state.onboardingDone && state.isReady}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        paddingBottom="72px"
        position="relative"
        borderRadius={useBreakpointValue({ base: "0", md: "md" })}
        overflow="hidden"
        bottom="0px"
        p={4}
        margin={0}
        alignSelf={{ base: "end", md: "center" }}
        mt={{ base: 0, md: "32px" }}
      >
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
        <Flex direction="column" alignItems="center" gap={4}>
          <Heading fontSize="2xl" fontWeight="600">
            Vamos começar
          </Heading>
          <Text width="400px" textAlign="center" mb={4} color="gray.600">
            Para que seu restaurante esteja pronto para abrir as portas é
            importante verificar se todas as informações estão devidamente
            cadastradas em{" "}
            <Box as="span" fontWeight="500">
              Configurações
            </Box>
            . Feita a configuração básica você pode partir para o cadastro de
            bairros e taxas, depois configure corretamente os horários e
            programe os fechamentos automáticos.
          </Text>
          <Flex direction={{ base: "column" }} width="100%" gap={2}>
            <Button colorScheme="brand" onClick={handleConfigClick}>
              Ir para Configurações
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
