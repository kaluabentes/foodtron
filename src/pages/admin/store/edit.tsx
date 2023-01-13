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
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useRef, useState } from "react"
import { GetServerSideProps } from "next"

import AppLayout from "@/layouts/AppLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import prisma from "@/lib/infra/prisma"
import auth from "@/middlewares/auth"
import { DataCell, DataHead, DataValue } from "@/components/DataTable"
import StoreProps from "@/modules/admin/store/interfaces/StoreProps"
import useUpdateStore from "@/modules/admin/store/hooks/useUpdateStore"

interface StorePageProps {
  store: StoreProps
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  const store = await prisma.store.findFirst({
    where: {
      id: authResult.props.session.user?.storeId!,
    },
  })

  return {
    props: {
      store: {
        ...store,
        minimumOrderPrice: store?.minimumOrderPrice?.toFixed(2),
      },
    },
  }
}

const EditStore = ({ store }: StorePageProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(store.isOpen!)

  const isPageLoaded = useIsPageLoaded()
  const { handleSubmitCallback, isSaving } = useUpdateStore()

  const { register, handleSubmit, setValue, formState, getValues } = useForm({
    defaultValues: store,
  })

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit((data: StoreProps) =>
          handleSubmitCallback({ ...data, isOpen })
        )}
      >
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
