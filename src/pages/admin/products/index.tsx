import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BiEdit, BiTrash } from "react-icons/bi"

import DeleteAlert from "@/components/DeleteAlert"
import EmptyState from "@/components/EmptyState"
import PageHeader from "@/components/PageHeader"
import TableSkeleton from "@/components/TableSkeleton"
import AdminLayout from "@/layouts/AdminLayout"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import auth from "@/middlewares/auth"
import useGetProducts from "@/modules/admin/products/hooks/useGetProducts"
import useDeleteProduct from "@/modules/admin/products/hooks/useDeleteProduct"
import Product from "@/modules/admin/products/types/Product"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const Products = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPageLoaded = useIsPageLoaded()

  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >()

  const { products, getProducts, isLoading } = useGetProducts()
  const { deleteProduct, isDeleting } = useDeleteProduct()

  const handleDeleteConfirm = async () => {
    if (selectedProductId) {
      await deleteProduct(selectedProductId)
      await getProducts()
      setSelectedProductId(undefined)
    }
  }

  const renderData = () => {
    if (isLoading) {
      return <TableSkeleton columns={4} rows={4} />
    }

    if (!products.length) {
      return <EmptyState message={t("productsEmptyState")} />
    }

    return (
      <Box
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="auto"
        marginBottom={8}
      >
        <Table>
          <Thead>
            <Th>{t("image")}</Th>
            <Th>{t("title")}</Th>
            <Th>{t("description")}</Th>
            <Th>{t("price")}</Th>
            <Th>{t("actions")}</Th>
          </Thead>
          <Tbody>
            {products.map((product: Product) => (
              <Tr key={product.id}>
                <Td>
                  <Image
                    borderRadius="4px"
                    src={product.image}
                    height="40px"
                    width="40px"
                    objectFit="cover"
                  />
                </Td>
                <Td>{product.title}</Td>
                <Td>{product.description}</Td>
                <Td>{product.price}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        router.push(`/admin/products/edit/${product.id}`)
                      }
                      aria-label="Editar produto"
                      icon={<BiEdit />}
                      size="sm"
                    />
                    <IconButton
                      aria-label="Remover produto"
                      icon={<BiTrash />}
                      size="sm"
                      onClick={() => setSelectedProductId(product.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  }

  return (
    <AdminLayout>
      <PageHeader
        title={t("products")}
        actions={
          <Button
            colorScheme="brand"
            onClick={() => router.push("/admin/products/add")}
          >
            Adicionar
          </Button>
        }
      />
      {!isPageLoaded && (
        <Flex padding={10} align="center" justifyContent="center">
          <Spinner colorScheme="brand" />
        </Flex>
      )}
      {isPageLoaded && renderData()}
      <DeleteAlert
        title="Deletar produto"
        description="Tem certeza? Você não pode desfazer esta ação."
        isOpen={Boolean(selectedProductId)}
        isLoading={isDeleting}
        onClose={() => setSelectedProductId(undefined)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  )
}

export default Products
