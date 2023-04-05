import { useToast } from "@chakra-ui/react"

interface ExecuteProps {
  title: string
  description: string
  status?: "success" | "info" | "warning" | "error" | "loading"
}

const useBottomToast = () => {
  const toast = useToast()

  const execute = ({
    title,
    description,
    status = "success",
  }: ExecuteProps) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    })
  }

  return execute
}

export default useBottomToast
