import { CompleteSignInData } from "@/pages/auth/complete-signin"
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface StoreCoverAvatarProps {
  errors: Partial<FieldErrorsImpl<CompleteSignInData>>
  register: UseFormRegister<CompleteSignInData>
}

const StoreCoverAvatar = ({ errors, register }: StoreCoverAvatarProps) => {
  const { t } = useTranslation()

  return (
    <Box>
      <FormControl isInvalid={Boolean(errors?.cover?.message)} marginBottom={4}>
        <FormLabel
          htmlFor="cover"
          background="gray.200"
          cursor="pointer"
          height="200px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {t("cover")}
        </FormLabel>
        <Input
          id="cover"
          placeholder="Padaria do Seu José"
          type="file"
          display="none"
          {...register("cover")}
        />
        <FormErrorMessage fontSize="xs">
          {errors.cover?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={Boolean(errors.logo?.message)}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FormLabel
          htmlFor="logo"
          background="gray.300"
          cursor="pointer"
          padding={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="130px"
          height="130px"
          borderRadius="50%"
          margin="-80px 0 0 0"
          border="3px solid white"
        >
          {t("logo")}
        </FormLabel>
        <Input
          id="logo"
          placeholder="Padaria do Seu José"
          type="file"
          display="none"
          {...register("logo")}
        />
        <FormErrorMessage fontSize="xs">
          {errors.logo?.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  )
}

export default StoreCoverAvatar
