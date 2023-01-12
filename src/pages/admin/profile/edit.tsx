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
import { User } from "@prisma/client"

interface ProfileEditProps {
  user: User
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await auth(context)

  if (authResult.redirect) {
    return authResult
  }

  console.log(authResult.props.session.user)

  return {
    props: {
      user: authResult.props.session.user,
    },
  }
}

const EditProfile = ({ user }: ProfileEditProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()

  const { register, handleSubmit, setValue, formState, getValues } = useForm({
    defaultValues: user,
  })

  const handleSubmitCallback = async (data: User) => {
    setIsSaving(true)

    try {
      await axios.patch("/api/profile/update", data)
      toast({
        title: "Feito!",
        description: "Informações atualizados com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })
      router.push("/admin/profile")
    } catch (error: any) {
      console.log("> Update profile error: ", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppLayout>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <PageHeader
          title={t("editProfile")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/profile")}
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
            backgroundColor="white"
            borderRadius={10}
            overflow="hidden"
            marginBottom={8}
          >
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
          </Box>
        )}
      </form>
    </AppLayout>
  )
}

export default EditProfile