import { Box, FormControl, Input } from "@chakra-ui/react"
import { ReactNode } from "react"
import { DataCell, DataHead, DataValue } from "../DataTable"

interface DataFieldProps {
  label: string
  input: ReactNode
}

const DataField = ({ label, input }: DataFieldProps) => (
  <DataCell>
    <DataHead>
      <Box as="span" fontWeight="500">
        {label}
      </Box>
    </DataHead>
    <DataValue>
      <FormControl>{input}</FormControl>
    </DataValue>
  </DataCell>
)

export default DataField
