import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Switch,
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
import prisma from "@/lib/providers/prisma/client"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import { IMaskMixin } from "react-imask"
import MaskedPhoneInput from "@/components/MaskedPhoneInput"

const DESTINATION = "/admin/orders"

export interface CompleteSignInData {
  storeName: string
  userName: string
  subdomain: string
  whatsapp: string
  cover: string
  logo: string
  isPrivacyPolicySigned: boolean
  isTermsOfUseSigned: boolean
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
        destination: DESTINATION,
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

Yup.addMethod(Yup.boolean, "terms", function (errorMessage) {
  return this.test("test-terms", errorMessage, function (value) {
    const { path, createError } = this

    return value || createError({ path, message: errorMessage })
  })
})

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
    whatsapp: Yup.string().required(t("requiredMessage")!),
    isPrivacyPolicySigned: Yup.boolean().terms(t("requiredMessage")!),
    isTermsOfUseSigned: Yup.boolean().terms(t("requiredMessage")!),
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
      whatsapp: "",
      isPrivacyPolicySigned: false,
      isTermsOfUseSigned: false,
    },
  })

  const handleSubmitCallback = async (data: CompleteSignInData) => {
    setIsLoading(true)

    try {
      await axios.post("/api/auth/complete-signin", {
        storeName: data.storeName,
        userName: data.userName,
        subdomain: data.subdomain,
        whatsapp: data.whatsapp,
        logo: logo,
        cover: cover,
        isPrivacyPolicySigned: data.isPrivacyPolicySigned,
        isTermsOfUseSigned: data.isTermsOfUseSigned,
      })

      toast({
        title: "Conta criada",
        description: "Conta criado sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      })

      router.push(DESTINATION)
    } catch (error: any) {
      if (error?.response?.data?.error?.domain) {
        setError("subdomain", {
          message: t("subdomainAlreadyInUse")!,
        })
      }

      console.log("> Complete signin error: ", error)
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
    const subscription = watch((data, { name }) => {
      if (name === "storeName") {
        setValue(
          "subdomain",
          slugify(data.storeName!, {
            replacement: "",
            lower: true,
          })
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <AuthLayout>
      <Flex
        justifyContent="center"
        as="a"
        href="https://foodtron.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
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
          <Input id="userName" {...register("userName")} />
          <FormErrorMessage fontSize="xs">
            {errors.userName?.message}
          </FormErrorMessage>
        </FormControl>
        <Heading size="md" marginBottom={5} fontWeight="500">
          {t("storeInformation")}
        </Heading>
        <Box
          borderColor="blackAlpha.200"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="md"
          marginBottom={6}
          overflow="hidden"
        >
          <StoreMidiaUpload onCoverChange={setCover} onLogoChange={setLogo} />
          <Box p={{ base: 4, md: 6 }}>
            <FormControl
              isInvalid={Boolean(errors.storeName?.message)}
              marginBottom={4}
            >
              <FormLabel htmlFor="storeName">{t("storeName")}</FormLabel>
              <Input id="storeName" placeholder="" {...register("storeName")} />
              <FormErrorMessage fontSize="xs">
                {errors.storeName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={Boolean(errors.whatsapp?.message)}
              marginBottom={4}
            >
              <FormLabel htmlFor="storeName">Whatsapp</FormLabel>
              <MaskedPhoneInput
                value={String(watch("whatsapp"))}
                mask="(00) 0 0000 0000"
                placeholder="(00) 0 0000 0000"
                onAccept={(value: string) => setValue("whatsapp", value)}
              />
              <FormErrorMessage fontSize="xs">
                {errors.whatsapp?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.subdomain?.message)}>
              <FormLabel htmlFor="subdomain">{t("subdomain")}</FormLabel>
              <InputGroup>
                <Input
                  id="subdomain"
                  placeholder=""
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
        <Flex direction="column" mb={6} gap={4}>
          <FormControl isInvalid={Boolean(errors.isTermsOfUseSigned?.message)}>
            <Flex gap={3}>
              <Switch colorScheme="brand" {...register("isTermsOfUseSigned")} />
              <Text>
                Eu concordo e aceito os{" "}
                <Box
                  as="a"
                  color="brand.500"
                  href="/terms-of-use"
                  fontWeight="500"
                  target="_blank"
                  rel="noopender noreferrer"
                >
                  Termos de Uso
                </Box>
              </Text>
            </Flex>
            <FormErrorMessage fontSize="xs">
              {errors.isTermsOfUseSigned?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors.isPrivacyPolicySigned?.message)}
          >
            <Flex gap={3}>
              <Switch
                colorScheme="brand"
                {...register("isPrivacyPolicySigned")}
              />
              <Text>
                Eu concordo e aceito os{" "}
                <Box
                  as="a"
                  color="brand.500"
                  href="/terms-of-use"
                  fontWeight="500"
                  target="_blank"
                  rel="noopender noreferrer"
                >
                  Política de Privacidade
                </Box>
              </Text>
            </Flex>
            <FormErrorMessage fontSize="xs">
              {errors.isPrivacyPolicySigned?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

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
