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

const ForgotPassword = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const forgotValidationSchema = Yup.object({
    email: Yup.string().email().required(t("requiredMessage")!),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotValidationSchema,
    onSubmit: () => {},
  })

  const renderContent = () => {
    if (false) {
      return (
        <Text>
          <Trans
            i18nKey="forgotPasswordEmailSent"
            values={{
              email: formik.values.email,
            }}
            components={[<strong />]}
          />
        </Text>
      )
    }

    return (
      <>
        <FormControl isInvalid={Boolean(formik.errors.email)} marginBottom={4}>
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage fontSize="xs">
            {formik.errors.email}
          </FormErrorMessage>
        </FormControl>
        <Button width="full" type="submit" variant="brand">
          {t("continue")}
        </Button>
      </>
    )
  }

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <IconButton
          onClick={router.back}
          variant="ghost"
          aria-label="Voltar"
          color="gray.500"
          icon={<AiOutlineArrowLeft fontSize="25px" />}
          marginBottom={9}
        />
        <Heading size="lg" marginBottom={6} fontWeight="semibold">
          {t("forgotPassword")}
        </Heading>
        <Text
          color={useColorModeValue("gray.600", "gray.500")}
          marginBottom={9}
        >
          {t("forgotPasswordText")}
        </Text>
        {renderContent()}
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
