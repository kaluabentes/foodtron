import Option from "./Option"

interface OptionGroup {
  id?: string
  title: string
  required: boolean
  maxOption: number
  options?: Option[]
}

export default OptionGroup
