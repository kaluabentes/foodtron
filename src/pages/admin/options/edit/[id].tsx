import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Spinner,
  Input,
  Switch,
  FormLabel,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import AdminLayout from "@/layouts/AdminLayout"
import PageHeader from "@/components/PageHeader"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import DataField from "@/components/DataField"
import auth from "@/middlewares/auth"
import useCreateOption from "@/modules/options/hooks/useCreateOption"
import { useState } from "react"
import Option from "@/modules/options/types/Option"
import EmptyState from "@/components/EmptyState"
import { BiTrash } from "react-icons/bi"
import OptionGroup from "@/modules/options/types/OptionGroup"
import useUpdateOption from "@/modules/options/hooks/useUpdateOption"
import useBottomToast from "@/lib/hooks/useBottomToast"

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth(context, ["admin"], async () => {
    const {
      query: { id },
    } = context

    const option = await prisma.optionGroup.findFirst({
      where: {
        id: String(id),
      },
      include: {
        options: true,
      },
    })

    return {
      props: {
        option: {
          ...option,
          options: option?.options.map((opt) => ({
            ...opt,
            price: opt.price ? opt.price?.toFixed(2) : null,
          })),
        },
      },
    }
  })
}

interface EditOptionProps {
  option: OptionGroup
}

const EditOption = ({ option: defaultOption }: EditOptionProps) => {
  const { t } = useTranslation()
  const toast = useBottomToast()
  const isPageLoaded = useIsPageLoaded()
  const router = useRouter()
  const [option, setOption] = useState({
    title: "",
    price: "",
  })
  const [options, setOptions] = useState<Option[]>(defaultOption?.options || [])

  const { updateOption, isUpdating } = useUpdateOption(String(defaultOption.id))

  const { register, handleSubmit } = useForm({
    defaultValues: defaultOption,
  })

  const handleAddOption = () => {
    setOptions((prev) => [...prev, option])
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

      updateOption({ ...data, options })
    })
  }

  return (
    <AdminLayout>
      <form onSubmit={handleFormSubmit()}>
        <PageHeader
          title={t("updateOptions")}
          actions={
            <Flex gap="8px">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/options")}
              >
                {t("cancel")}
              </Button>
              <Button colorScheme="brand" isLoading={isUpdating} type="submit">
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
              label={t("required")}
              input={<Switch {...register("required")} />}
            />
            <Box pl={8} pr={8} pt={8}>
              <Heading fontSize="md">Opções</Heading>
            </Box>
            <Box padding={8} pb={4} pt={4}>
              <Flex
                gap={4}
                p={4}
                border="1px solid transparent"
                borderColor="gray.200"
                borderRadius="md"
              >
                <Box flex={1}>
                  <FormLabel>Título</FormLabel>
                  <Input
                    onChange={(event) =>
                      setOption((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                  />
                </Box>
                <Box flex={1}>
                  <FormLabel>Preço</FormLabel>
                  <Input
                    onChange={(event) =>
                      setOption((prev) => ({
                        ...prev,
                        price: event.target.value,
                      }))
                    }
                  />
                </Box>
              </Flex>
            </Box>
            <Box pb={8} pl={8} pr={8}>
              <Button
                colorScheme="brand"
                onClick={handleAddOption}
                disabled={!option.title || !option.price}
              >
                Adicionar opção
              </Button>
            </Box>
            <Box p={8} pt={0}>
              {options.length === 0 ? (
                <EmptyState message={t("optionsEmptyState")} />
              ) : (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Título</Th>
                      <Th>Preço</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {options.map((option: Option) => (
                      <Tr key={option.id}>
                        <Td>{option.title}</Td>
                        <Td>{option.price}</Td>
                        <Td>
                          <IconButton
                            aria-label="Remover produto"
                            icon={<BiTrash />}
                            size="sm"
                            onClick={() =>
                              setOptions((prev) =>
                                prev.filter(
                                  (childOption) => childOption.id !== option.id
                                )
                              )
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          </Box>
        )}
      </form>
    </AdminLayout>
  )
}

export default EditOption
