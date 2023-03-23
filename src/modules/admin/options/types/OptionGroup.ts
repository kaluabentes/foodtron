import Option from "./Option"

interface OptionGroup {
  id?: string
  title: string
  required: boolean
  maxOptionRequired: boolean
  maxOption: string
  options?: Option[]
}

export default OptionGroup
