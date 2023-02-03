import Option from "./Option"

interface OptionGroup {
  id?: string
  title: string
  required: boolean
  maxOption: string
  options?: Option[]
}

export default OptionGroup
