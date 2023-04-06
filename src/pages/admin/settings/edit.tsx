import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { GetServerSideProps } from "next"
import { IMaskMixin } from "react-imask"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import prisma from "@/lib/infra/prisma/client"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import Store from "@/modules/admin/stores/types/Store"
import useUpdateStore from "@/modules/admin/stores/hooks/useUpdateStore"
import { User } from "@prisma/client"
import MaskedPhoneInput from "@/components/MaskedPhoneInput"
import { ChangeEvent } from "react"
import filterNumber from "@/lib/helpers/string/filterNumber"
import StoreParam from "@/modules/admin/stores/types/StoreParam"
import useBottomToast from "@/lib/hooks/useBottomToast"
import isNaN from "@/lib/helpers/number/isNaN"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async (user: User) => {
    const store = await prisma.store.findFirst({
      where: {
        id: String(user.storeId),
      },
    })

    return {
      props: {
        store: {
          ...store,
          minimumOrderPrice: store?.minimumOrderPrice?.toFixed(2) || null,
        },
      },
    }
  })
}

interface StorePageProps {
  store: Store
}

const EditStore = ({ store }: StorePageProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const toast = useBottomToast()

  const isPageLoaded = useIsPageLoaded()
  const { updateStore, isSaving } = useUpdateStore()

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: store as StoreParam,
  })

  const handleUpdate = async (values: StoreParam) => {
    if (isNaN(values.minimumOrderPrice!)) {
      toast({
        title: "Atenção",
        description: "O preço mínimo está mal formatado",
        status: "error",
      })
      return
    }

    await updateStore(values)
    router.push("/admin/settings")
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <PageHeader
          title="Editar configurações"
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/settings")}
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
            shadow="sm"
            backgroundColor="white"
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
                  <Switch colorScheme="brand" {...register("isOpen")} />
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
                    <MaskedPhoneInput
                      value={String(watch("whatsapp"))}
                      mask="(00) 0 0000 0000"
                      placeholder="(00) 0 0000 0000"
                      onAccept={(value: string) => setValue("whatsapp", value)}
                    />
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
                    <Input
                      value={String(watch("minimumOrderPrice"))}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setValue(
                          "minimumOrderPrice",
                          filterNumber(event.currentTarget.value)
                        )
                      }
                      required
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
            </Box>
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditStore
