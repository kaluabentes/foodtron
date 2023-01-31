import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  Image,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Select,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import prisma from "@/lib/infra/prisma"
import Product from "@/modules/admin/products/types/Product"
import useUpdateProduct from "@/modules/admin/products/hooks/useUpdateProduct"
import Script from "next/script"
import { get } from "lodash"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"
import { useState } from "react"
import useGetOptions from "@/modules/admin/options/hooks/useGetOptions"
import EmptyState from "@/components/EmptyState"
import { BiTrash } from "react-icons/bi"
import useGetCategories from "@/modules/admin/categories/hooks/useGetCategories"
import Category from "@/modules/admin/categories/types/Category"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const product = await prisma.product.findFirst({
      where: {
        id: String(id),
      },
      include: {
        productOptionGroups: {
          include: {
            optionGroup: true,
          },
        },
      },
    })

    return {
      props: {
        product: {
          ...product,
          price: product?.price.toFixed(2),
        },
      },
    }
  })
}

interface EditProductProps {
  product: Product
}

const cloudinaryOptions = {
  cloudName: "optimus-media",
  uploadPreset: "lw2kqdxm",
}

const EditProduct = ({ product }: EditProductProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()

  const { updateProduct, isUpdating } = useUpdateProduct(product.id!)
  const { options } = useGetOptions()
  const { categories } = useGetCategories()

  const [productOptions, setProductOptions] = useState<OptionGroup[]>(
    product.productOptionGroups?.map((pog) => pog.optionGroup)!
  )
  console.log("product", product)
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: product,
  })

  const handleImageUpload = () => {
    window.cloudinary.openUploadWidget(
      cloudinaryOptions,
      (error: any, result: any) => {
        if (error) {
          console.log("> Cloudinary error: ", error)
        }

        const imagePath = get(result, "info.files[0].uploadInfo.url")

        if (imagePath) {
          setValue("image", imagePath)
        }
      }
    )!
  }

  const handleFormSubmit = () => {
    return handleSubmit((data) =>
      updateProduct({
        ...data,
        optionGroups: productOptions,
        disconnectOptionGroups: options.filter(
          (opt: OptionGroup) =>
            !productOptions.find((childOpt) => childOpt.id === opt.id)
        ),
      })
    )
  }

  return (
    <AdminLayout>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      <form onSubmit={handleFormSubmit()}>
        <PageHeader
          title={t("editProduct")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/products")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isUpdating} type="submit">
                {t("save")}
              </Button>
            </Flex>
          }
        />
        {!isPageLoaded && (
          <Flex padding={10} align="center" justifyContent="center">
            <Spinner colorScheme="brand" />
          </Flex>
        )}
        {isPageLoaded && (
          <Box
            shadow="sm"
            backgroundColor="white"
            borderRadius={10}
            overflow="hidden"
            marginBottom={8}
          >
            <DataField
              label={t("title")}
              input={<Input {...register("title")} />}
            />
            <DataField
              label={t("category")}
              input={
                <Select
                  {...register("categoryId")}
                  value={String(watch("categoryId"))}
                  required
                >
                  <option value="">Selecione</option>
                  {categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Select>
              }
            />
            <DataField
              label={t("description")}
              input={<Input {...register("description")} />}
            />
            <DataField
              label={t("price")}
              input={<Input {...register("price")} />}
            />
            <DataField
              label={t("image")}
              input={
                watch("image") ? (
                  <>
                    <Button onClick={handleImageUpload} mb={2}>
                      Fazer upload
                    </Button>
                    <Image width="600px" src={watch("image")} />
                  </>
                ) : (
                  <Button onClick={handleImageUpload}>Fazer upload</Button>
                )
              }
            />
            <Box p={8}>
              <Heading fontSize="md" mb={4}>
                Opções
              </Heading>
              <Flex gap={2}>
                {options
                  .filter(
                    (opt: OptionGroup) =>
                      !productOptions.find((childOpt) => childOpt.id === opt.id)
                  )
                  .map((opt: OptionGroup) => (
                    <Button
                      key={opt.id}
                      onClick={() =>
                        setProductOptions((prev) => [...prev, opt])
                      }
                    >
                      {opt.title}
                    </Button>
                  ))}
              </Flex>
            </Box>
            <Box p={8} pt={0} overflow="auto">
              {productOptions.length === 0 ? (
                <EmptyState message="Não opções criadas no momento." />
              ) : (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Título</Th>
                      <Th>Máximo de opções</Th>
                      <Th>Obrigatório</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {productOptions.map((option: OptionGroup) => (
                      <Tr key={option.id}>
                        <Td>{option.title}</Td>
                        <Td>{option.maxOption}</Td>
                        <Td>{option.required ? "Sim" : "Não"}</Td>
                        <Td>
                          <IconButton
                            aria-label="Remover produto"
                            icon={<BiTrash />}
                            size="sm"
                            onClick={() =>
                              setProductOptions((prev) =>
                                prev.filter(
                                  (childOption: OptionGroup) =>
                                    childOption.id !== option.id
                                )
                              )
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditProduct
