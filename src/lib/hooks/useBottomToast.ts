import { useToast } from "@chakra-ui/react"

interface ExecuteProps {
  title: string
  description: string
}

const useBottomToast = () => {
  const toast = useToast()

  const execute = ({ title, description }: ExecuteProps) => {
    toast({
      title,
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    })
  }

  return execute
}

export default useBottomToast
