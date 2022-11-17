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
} from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"

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
    <AppLayout hasPadding={false}>
      <Heading size="lg" marginBottom={8} fontWeight="semibold" marginTop={8}>
        {t("district")}
      </Heading>
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
    </AppLayout>
  )
}

export default Districts
