import { useTranslation } from "react-i18next"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { getSession, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import AuthLayout from "@/layouts/AuthLayout"
import { BiArrowBack } from "react-icons/bi"

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (session?.user) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

interface SignInData {
  email: string
}

const Signin = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isLoadingEmail, setIsLoadingEmail] = useState(false)

  const signinValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalidEmail")!)
      .required(t("requiredMessage")!),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signinValidationSchema),
  })

  const handleSubmitCallback = (data: SignInData) => {
    setIsLoadingEmail(true)
    signIn("email", {
      email: data.email,
      callbackUrl: "/auth/complete-signin",
    })
  }

  return (
    <AuthLayout>
      <IconButton
        aria-label="Voltar"
        variant="ghost"
        color="gray.500"
        icon={<BiArrowBack fontSize="24px" />}
        onClick={() => router.back()}
        height="24px"
        width="24px"
        minWidth="initial"
        _hover={{
          background: "transparent",
        }}
      />
      <Flex
        justifyContent="center"
        as="a"
        href="https://foodtron.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/comet-full.svg" height="50px" mb={14} mt={5} />
      </Flex>
      <Heading size="lg" marginBottom={10} fontWeight="semibold">
        {t("signinComet")}
      </Heading>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <FormControl
          isInvalid={Boolean(errors.email?.message)}
          marginBottom={4}
        >
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input placeholder="example@domain.com" {...register("email")} />
          <FormErrorMessage fontSize="xs">
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoadingEmail}
          width="full"
          type="submit"
          colorScheme="brand"
        >
          {`${t("signin")} `}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Signin
