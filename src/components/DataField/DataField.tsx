import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { DataCell, DataHead, DataValue } from "../DataTable"
import IconActionButton from "../IconActionButton"
import { BiHelpCircle } from "react-icons/bi"

interface DataFieldProps {
  label: string
  input: ReactNode
  tooltip?: string
}

const DataField = ({ label, input, tooltip }: DataFieldProps) => (
  <DataCell>
    <DataHead>
      <Flex alignItems="center" gap={2}>
        <Box as="span" fontWeight="500">
          {label}
        </Box>
        {tooltip && (
          <Popover>
            <PopoverTrigger>
              <Button variant="link">
                <IconActionButton icon={<BiHelpCircle />} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="500">Ajuda</PopoverHeader>
              <PopoverBody>{tooltip}</PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </DataHead>
    <DataValue>
      <FormControl>{input}</FormControl>
    </DataValue>
  </DataCell>
)

export default DataField
