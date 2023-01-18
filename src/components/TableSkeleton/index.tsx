import range from "@/lib/helpers/arrays/range"
import {
  Box,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

interface TableSkeletonProps {
  columns: number
  rows: number
}

const TableSkeleton = ({ columns, rows }: TableSkeletonProps) => (
  <Box
    shadow="sm"
    backgroundColor="white"
    borderRadius="md"
    overflow="auto"
    marginBottom={8}
  >
    <Table>
      <Thead>
        {range(columns).map(() => (
          <Th>
            <Skeleton height="10px" />
          </Th>
        ))}
      </Thead>
      <Tbody>
        {range(rows).map(() => (
          <Tr>
            {range(columns).map(() => (
              <Td>
                <Skeleton height="10px" />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
)

export default TableSkeleton
