import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  Image,
  Heading,
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

import useCreateProduct from "@/modules/admin/products/hooks/useCreateProduct"
import Script from "next/script"
import { get } from "lodash"
import { ChangeEvent, useState } from "react"
import useGetOptions from "@/modules/admin/options/hooks/useGetOptions"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"
import useGetCategories from "@/modules/admin/categories/hooks/useGetCategories"
import Category from "@/modules/admin/categories/types/Category"
import OptionButton from "@/modules/admin/products/components/OptionButton"
import AddOptionModal from "@/modules/admin/products/components/AddOptionModal"
import EmptyState from "@/components/EmptyState"
import filterNumber from "@/lib/helpers/string/filterNumber"
import useBottomToast from "@/lib/hooks/useBottomToast"
import isNaN from "@/lib/helpers/number/isNaN"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const cloudinaryOptions = {
  cloudName: "optimus-media",
  uploadPreset: "lw2kqdxm",
}

const AddProduct = () => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const toast = useBottomToast()

  const { createProduct, isCreating } = useCreateProduct()
  const { options, getOptions } = useGetOptions()
  const { categories } = useGetCategories()

  const [productOptions, setProductOptions] = useState<OptionGroup[]>([])
  const [isAddOptionModalOpen, setIsAddOptionModal] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      image: "",
      categoryId: "",
    },
  })

  const handleCreate = (data: any) => {
    if (isNaN(data.price)) {
      toast({
        title: "Atenção",
        description: "O preço está mal formatado",
        status: "error",
      })
      return
    }

    createProduct({ ...data, optionGroups: productOptions })
  }

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

  return (
    <AdminLayout>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      <form onSubmit={handleSubmit(handleCreate)}>
        <PageHeader
          title={t("addProducts")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/products")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isCreating} type="submit">
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
                <Select {...register("categoryId")} required>
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
                    <Image width="600px" src={watch("image")} />
                  </>
                ) : (
                  <Button onClick={handleImageUpload}>Fazer upload</Button>
                )
              }
            />
            <Box p={6}>
              <Heading fontSize="lg" fontWeight="600" mb={4}>
                Selecione as opções
              </Heading>
              {!options.length && (
                <EmptyState message="Não opções criados no momento." />
              )}
              <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={4}>
                {options.map((option: OptionGroup) => (
                  <GridItem colSpan={1}>
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

export default AddProduct
