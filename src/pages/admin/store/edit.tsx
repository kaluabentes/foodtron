import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  Table,
  Tr,
  Spinner,
  Tbody,
  Link,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
  useToast,
} from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import { GetServerSideProps } from "next"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import prisma from "@/lib/infra/prisma"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import StoreProps from "@/modules/store/interfaces/StoreProps"
import ActionButton from "@/components/ActionButton"
import { FaRegSave } from "react-icons/fa"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useRef, useState } from "react"
import axios from "axios"

interface StorePageProps {
  store: StoreProps
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  const user = await prisma.user.findFirst({
    where: {
      email: authResult.props.session.user?.email,
    },
    include: {
      store: true,
    },
  })

  return {
    props: {
      store: {
        ...user?.store,
        minimumOrderPrice: user?.store?.minimumOrderPrice?.toFixed(2),
      },
    },
  }
}

const EditStore = ({ store }: StorePageProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(store.isOpen!)

  const { register, handleSubmit, setValue, formState, getValues } = useForm({
    defaultValues: store,
  })

  const handleSubmitCallback = async (data: StoreProps) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/store/update", {
        ...data,
        isOpen,
      })
      toast({
        title: "Feito!",
        description: "Informações atualizados com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
    } catch (error: any) {
      console.log("> Update store: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  console.log("store", store)

  return (
    <AppLayout>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <PageHeader
          title={t("editStore")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/store")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isSaving} type="submit">
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
            boxShadow="md"
            backgroundColor={boxBackground}
            borderRadius={10}
            overflow="hidden"
            marginBottom={8}
          >
            <StoreMidiaUpload
              defaultCover={store.cover!}
              defaultLogo={store.logo!}
              onCoverChange={(value) => setValue("cover", value)}
              onLogoChange={(value) => setValue("logo", value)}
            />
            <Box marginTop={8}>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("isOpen")}
                  </Box>
                </DataHead>
                <DataValue>
                  <Switch
                    isChecked={isOpen}
                    onChange={() => setIsOpen((prev) => !prev)}
                  />
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("name")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input {...register("name")} />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("address")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input {...register("address")} />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("whatsapp")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input
                      type="number"
                      maxLength={11}
                      {...register("whatsapp")}
                    />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("facebook")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      {...register("facebook")}
                    />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("instagram")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      {...register("instagram")}
                    />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("subdomain")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <InputGroup>
                      <Input {...register("subdomain")} />
                      <InputRightAddon
                        children={`.${process.env.NEXT_PUBLIC_APEX_DOMAIN}`}
                      />
                    </InputGroup>
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("customDomain")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input {...register("customDomain")} />
                  </FormControl>
                </DataValue>
              </DataCell>
              <DataCell>
                <DataHead>
                  <Box as="span" fontWeight="500">
                    {t("minimumOrderPrice")}
                  </Box>
                </DataHead>
                <DataValue>
                  <FormControl>
                    <Input {...register("minimumOrderPrice")} />
                  </FormControl>
                </DataValue>
              </DataCell>
            </Box>
          </Box>
        )}
      </form>
    </AppLayout>
  )
}

export default EditStore
