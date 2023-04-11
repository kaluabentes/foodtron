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
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import prisma from "@/lib/providers/prisma/client"
import Product from "@/modules/admin/products/types/Product"
import useUpdateProduct from "@/modules/admin/products/hooks/useUpdateProduct"
import Script from "next/script"
import { get } from "lodash"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"
import { ChangeEvent, useState } from "react"
import useGetOptions from "@/modules/admin/options/hooks/useGetOptions"
import EmptyState from "@/components/EmptyState"
import { BiTrash } from "react-icons/bi"
import useGetCategories from "@/modules/admin/categories/hooks/useGetCategories"
import Category from "@/modules/admin/categories/types/Category"
import OptionButton from "@/modules/admin/products/components/OptionButton"
import AddOptionModal from "@/modules/admin/products/components/AddOptionModal"
import filterNumber from "@/lib/helpers/string/filterNumber"
import useBottomToast from "@/lib/hooks/useBottomToast"

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
  const toast = useBottomToast()

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: product,
  })

  const { updateProduct, isUpdating } = useUpdateProduct(product.id!)
  const { options, getOptions } = useGetOptions()
  const { categories } = useGetCategories()

  const [productOptions, setProductOptions] = useState<OptionGroup[]>(
    product.productOptionGroups?.map((pog) => pog.optionGroup)!
  )
  const [isAddOptionModalOpen, setIsAddOptionModal] = useState(false)

  const handleOptionClick = (option: OptionGroup) =>
    setProductOptions((prev) => {
      const foundOpt = prev.find((prevOption) => prevOption.id === option.id)

      if (foundOpt) {
        return prev.filter((prevOption) => prevOption.id !== option.id)
      } else {
        return [...prev, option]
      }
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
          setValue("image", imagePath.replace("http://", "https://"))
        }
      }
    )!
  }

  const handleUpdate = (data: any) => {
    if (isNaN(data.price)) {
      toast({
        title: "Atenção",
        description: "O preço está mal formatado",
        status: "error",
      })
      return
    }

    updateProduct({
      ...data,
      optionGroups: productOptions,
      disconnectOptionGroups: options.filter(
        (opt: OptionGroup) =>
          !productOptions.find((childOpt) => childOpt.id === opt.id)
      ),
    })
  }

  return (
    <AdminLayout>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      <form onSubmit={handleSubmit(handleUpdate)}>
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
              input={<Input {...register("title")} required />}
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
              input={
                <Input
                  value={String(watch("price"))}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setValue("price", filterNumber(event.currentTarget.value))
                  }
                  required
                />
              }
            />
            <DataField
              label={t("image")}
              input={
                watch("image") ? (
                  <>
                    <Button onClick={handleImageUpload} mb={2}>
                      Fazer upload
                    </Button>
                    <Image
                      height={{ base: "initial", md: "300px" }}
                      width={{ base: "100%", md: "initial" }}
                      src={watch("image")}
                    />
                  </>
                ) : (
                  <Button onClick={handleImageUpload}>Fazer upload</Button>
                )
              }
            />
            <Box p={6}>
              <Heading fontSize="lg" mb={4} fontWeight="700">
                Selecione as opções
              </Heading>
              {!options.length && (
                <EmptyState message="Não opções criados no momento." />
              )}
              <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={4}>
                {options.map((option: OptionGroup) => (
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <OptionButton
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      isActive={Boolean(
                        productOptions.find((opt) => opt.id === option.id)
                      )}
                    >
                      {option.title}
                    </OptionButton>
                  </GridItem>
                ))}
              </Grid>
              <Button
                onClick={() => setIsAddOptionModal(true)}
                colorScheme="brand"
              >
                Criar opção
              </Button>
            </Box>
          </Box>
        )}
      </form>
      <AddOptionModal
        isOpen={isAddOptionModalOpen}
        onClose={() => setIsAddOptionModal(false)}
        onConfirm={() => {
          getOptions()
          setIsAddOptionModal(false)
        }}
      />
    </AdminLayout>
  )
}

export default EditProduct
