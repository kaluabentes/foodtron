import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  Switch,
  Heading,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import useCreateOption from "@/modules/admin/options/hooks/useCreateOption"
import { useState } from "react"
import useBottomToast from "@/lib/hooks/useBottomToast"
import OptionInputCard from "@/modules/admin/options/components/OptionInputCard"

export interface OptionDraft {
  title: string
  price: string
  [key: string]: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"])
}

const AddOption = () => {
  const { t } = useTranslation()
  const toast = useBottomToast()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()

  const [options, setOptions] = useState<OptionDraft[]>([])

  const { createOption, isCreating } = useCreateOption()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      maxOption: "",
      required: false,
      maxOptionRequired: false,
    },
  })

  const getOptionValue = (optionId: string, field: string) => {
    const foundOpt = options.find((opt) => opt.id === optionId)

    return foundOpt![field]
  }

  const createNewOption = () => ({
    id: uuidv4(),
    title: "",
    price: "",
  })

  const handleAddOption = () => {
    setOptions((prev) => [...prev, createNewOption()])
  }

  const handleOptionChange = (
    option: OptionDraft,
    field: string,
    value: string
  ) => {
    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id === option.id) {
          return {
            ...opt,
            [field]: value,
          }
        }

        return opt
      })
    )
  }

  const handleFormSubmit = () => {
    return handleSubmit((data) => {
      if (!options.length) {
        toast({
          title: "Atenção!",
          description: "Adicione ao menos uma opção",
          status: "error",
        })
        return
      }

      if (options.length > 0 && options.some((opt) => !opt.title.length)) {
        toast({
          title: "Atenção!",
          description: "Preencha o campo título",
          status: "error",
        })
        return
      }

      createOption({ ...data, options })
    })
  }

  return (
    <AdminLayout>
      <form onSubmit={handleFormSubmit()}>
        <PageHeader
          title={t("addOptions")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/options")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isCreating} type="submit">
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
            <DataField
              label={t("title")}
              input={<Input {...register("title")} required />}
            />
            <DataField
              label={t("maxOption")}
              input={
                <Input {...register("maxOption")} type="number" required />
              }
            />
            <DataField
              label={t("maxOptionRequired")}
              input={
                <Switch
                  colorScheme="brand"
                  {...register("maxOptionRequired")}
                />
              }
            />
            <DataField
              label={t("required")}
              input={<Switch colorScheme="brand" {...register("required")} />}
            />
            <Box pl={6} pr={6} pt={6}>
              <Heading fontSize="md">Opções</Heading>
            </Box>
            <Flex direction="column" gap={4} padding={6} pb={4} pt={4}>
              {options.map((option) => (
                <OptionInputCard
                  title={getOptionValue(option.id, "title")}
                  price={getOptionValue(option.id, "price")}
                  onTitleChange={(event) =>
                    handleOptionChange(
                      option,
                      "title",
                      event.currentTarget.value
                    )
                  }
                  onPriceChange={(event) =>
                    handleOptionChange(
                      option,
                      "price",
                      event.currentTarget.value
                    )
                  }
                  onRemove={() =>
                    setOptions((prev) =>
                      prev.filter((opt) => opt.id !== option.id)
                    )
                  }
                  key={option.id}
                />
              ))}
            </Flex>
            <Box pb={6} pl={6} pr={6}>
              <Button colorScheme="brand" onClick={handleAddOption}>
                Adicionar opção
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default AddOption
