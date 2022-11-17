import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

import AuthLayout from "@/layouts/AuthLayout"
import Link from "@/components/Link"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const forgotValidationSchema = Yup.object({
    password: Yup.string().required(t("requiredMessage")!),
  })

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: forgotValidationSchema,
    onSubmit: () => {},
  })

  const renderChilds = () => {
    if (false) {
      return (
        <Text>
          <Trans
            i18nKey="changePasswordTokenError"
            values={{
              signin: t("makeLogin"),
            }}
            components={[<Link path="/auth/signin" />]}
          />
        </Text>
      )
    }

    if (false) {
      return (
        <Text>
          <Trans
            i18nKey="successfullyChangedPassword"
            values={{
              signin: t("makeLogin"),
            }}
            components={[<Link path="/signin" />]}
          />
        </Text>
      )
    }

    return (
      <>
        <FormControl
          isInvalid={Boolean(formik.errors.password)}
          marginBottom={4}
        >
          <FormLabel htmlFor="password">{t("password")}</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <FormErrorMessage fontSize="xs">
            {formik.errors.password}
          </FormErrorMessage>
        </FormControl>
        <Button variant="brand" width="full" type="submit">
          {t("continue")}
        </Button>
      </>
    )
  }

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <IconButton
          onClick={() => router.push("/signin")}
          variant="ghost"
          aria-label="Voltar"
          color="gray.900"
          icon={<AiOutlineArrowLeft fontSize="25px" />}
          marginBottom={9}
        />
        <Heading size="lg" marginBottom={6} fontWeight="semibold">
          {t("changePassword")}
        </Heading>
        <Text
          color={useColorModeValue("gray.600", "gray.500")}
          marginBottom={9}
        >
          {t("changePasswordText")}
        </Text>
        {renderChilds()}
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
