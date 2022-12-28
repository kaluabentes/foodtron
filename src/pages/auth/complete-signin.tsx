import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { getProviders, getSession, useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from "axios"
import slugify from "slugify"
import { Cloudinary } from "@cloudinary/url-gen"

import AuthLayout from "@/layouts/AuthLayout"
import prisma from "@/lib/prisma"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"

export interface CompleteSignInData {
  storeName: string
  userName: string
  subdomain: string
  cover: string
  logo: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getSession(context)
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  })

  if (user?.storeId) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers,
    },
  }
}

const CompleteSignin = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [cover, setCover] = useState("")
  const [logo, setLogo] = useState("")
  const toast = useToast()

  const signinValidationSchema = Yup.object({
    storeName: Yup.string().required(t("requiredMessage")!),
    userName: Yup.string().required(t("requiredMessage")!),
    subdomain: Yup.string().required(t("requiredMessage")!),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<CompleteSignInData>({
    resolver: yupResolver(signinValidationSchema),
    defaultValues: {
      userName: session?.user?.name!,
    },
  })

  const handleSubmitCallback = async (data: CompleteSignInData) => {
    setIsLoading(true)

    const payload = {
      storeName: data.storeName,
      userName: data.userName,
      subdomain: data.subdomain,
      logo: logo,
      cover: cover,
    }

    console.log("payload", payload)

    try {
      await axios.post("/api/auth/complete-signin", {
        storeName: data.storeName,
        userName: data.userName,
        subdomain: data.subdomain,
        logo: logo,
        cover: cover,
      })

      toast({
        title: "Conta criada",
        description: "Conta criado sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })

      router.push("/admin/store")
    } catch (error: any) {
      if (error?.response?.data?.error?.domain) {
        setError("subdomain", {
          message: t("subdomainAlreadyInUse")!,
        })
      }

      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user?.name) {
      setValue("userName", session.user.name)
    }
  }, [session?.user?.name])

  useEffect(() => {
    const subscription = watch(({ storeName }, { name, type }) => {
      if (name === "storeName") {
        setValue(
          "subdomain",
          slugify(storeName!, {
            replacement: "",
            lower: true,
          })
        )
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <AuthLayout isLarge>
      <Flex justifyContent="center">
        <Image src="/comet-blue.svg" width="80px" mb={10} />
      </Flex>
      <Heading size="lg" marginBottom={5} fontWeight="semibold">
        {t("completeSignin")}
      </Heading>
      <Text mb={10}>Para continuar complete o seu cadastro abaixo</Text>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <FormControl
          isInvalid={Boolean(errors.userName?.message)}
          marginBottom={10}
        >
          <FormLabel htmlFor="userName">{t("userName")}</FormLabel>
          <Input
            id="userName"
            placeholder="Seu José"
            {...register("userName")}
          />
          <FormErrorMessage fontSize="xs">
            {errors.userName?.message}
          </FormErrorMessage>
        </FormControl>
        <Heading size="sm" marginBottom={5}>
          {t("storeInformation")}
        </Heading>
        <Box
          borderColor="blackAlpha.200"
          borderWidth="1px"
          borderStyle="solid"
          boxShadow="md"
          borderRadius="md"
          marginBottom={5}
          overflow="hidden"
        >
          <StoreMidiaUpload
            onCoverChange={(value) => {
              console.log("cover", cover)
              setCover(value)
            }}
            onLogoChange={setLogo}
          />
          <Box p={{ base: 4, md: 6 }}>
            <FormControl
              isInvalid={Boolean(errors.storeName?.message)}
              marginBottom={4}
            >
              <FormLabel htmlFor="storeName">{t("storeName")}</FormLabel>
              <Input
                id="storeName"
                placeholder="Padaria do Seu José"
                {...register("storeName")}
              />
              <FormErrorMessage fontSize="xs">
                {errors.storeName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.subdomain?.message)}>
              <FormLabel htmlFor="subdomain">{t("subdomain")}</FormLabel>
              <InputGroup>
                <Input
                  id="subdomain"
                  placeholder="seujose"
                  {...register("subdomain")}
                />
                <InputRightAddon
                  children={`.${process.env.NEXT_PUBLIC_APEX_DOMAIN}`}
                />
              </InputGroup>
              <FormErrorMessage fontSize="xs">
                {errors.subdomain?.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
        </Box>
        <Button
          isLoading={isLoading}
          width="full"
          type="submit"
          colorScheme="brand"
        >
          {`${t("continue")} `}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default CompleteSignin
