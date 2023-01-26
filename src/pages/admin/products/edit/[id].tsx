import { useTranslation } from "react-i18next"
import { Box, Button, Flex, Spinner, Input, Image } from "@chakra-ui/react"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const product = await prisma.product.findFirst({
      where: {
        id: String(id),
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

  return (
    <AdminLayout>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      <form onSubmit={handleSubmit(updateProduct)}>
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
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditProduct
