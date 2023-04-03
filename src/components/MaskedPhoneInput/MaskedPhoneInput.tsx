import { Input } from "@chakra-ui/react"
import { IMaskMixin } from "react-imask"

const MaskedPhoneInput = IMaskMixin(({ inputRef, ...props }: any) => (
  <Input {...props} ref={inputRef} />
))

export default MaskedPhoneInput
