import { useEffect } from "react"
import { Trans, useTranslation } from "react-i18next"
import {
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Badge,
  Td,
  TableContainer,
  Flex,
  Box,
  Text,
  Button,
  useColorModeValue,
  TableCaption,
  Thead,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"

const Districts = () => {
  const { t } = useTranslation()
  const districts = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: String(index + 1),
      name: "Flores" + (index + 1),
      tax: 1000.55,
    }))

  return (
    <AdminLayout hasPadding={false}>
      <PageHeader
        title={t("districts")}
        actions={<Button colorScheme="brand">Criar</Button>}
      />
      <Box
        marginBottom={9}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        backgroundColor={useColorModeValue("white", "gray.800")}
        borderRadius={{ base: "none", sm: 10 }}
        padding={5}
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Taxa de entrega</Th>
              </Tr>
            </Thead>
            <Tbody>
              {districts.map((district) => (
                <Tr>
                  <Td>{district.name}</Td>
                  <Td>
                    {district.tax.toLocaleString("pt-br", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                    })}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  )
}

export default Districts
