import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  Input,
  Switch,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { BiPlus } from "react-icons/bi"

import DataField from "@/components/DataField"
import useCreateOption from "@/modules/admin/options/hooks/useCreateOption"
import { useState } from "react"
import useBottomToast from "@/lib/hooks/useBottomToast"
import OptionInputCard from "@/modules/admin/options/components/OptionInputCard"

import { OptionDraft } from "@/pages/admin/options/add"
import isNaN from "@/lib/helpers/number/isNaN"

interface AddOptionModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
}

const DEFAULT_VALUES = {
  title: "",
  maxOption: "",
  required: false,
  maxOptionRequired: false,
}

const AddOptionModal = ({
  onClose,
  onConfirm,
  isOpen,
}: AddOptionModalProps) => {
  const { t } = useTranslation()
  const toast = useBottomToast()

  const [options, setOptions] = useState<OptionDraft[]>([])

  const { createOption, isCreating } = useCreateOption()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: DEFAULT_VALUES,
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

  const handleCreate = async (data: any) => {
    if (options.some((opt) => isNaN(opt.price))) {
      toast({
        title: "Atenção",
        description: "O preço está mal formatado",
        status: "error",
      })
      return
    }

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

    await createOption({ ...data, options })
    setOptions([])
    reset()
    onConfirm()
  }

  return (
    <Modal size={{ base: "full", lg: "3xl" }} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar opção</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody p={0}>
            <Box
              shadow="sm"
              backgroundColor="white"
              borderRadius={10}
              overflow="hidden"
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
                    onPriceChange={(value) =>
                      handleOptionChange(option, "price", value)
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
                <Button
                  leftIcon={<BiPlus />}
                  variant="outline"
                  onClick={handleAddOption}
                >
                  Adicionar
                </Button>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter p={0}>
            <Flex
              width="100%"
              p={6}
              direction={{ base: "column", lg: "row" }}
              justifyContent={{ lg: "end" }}
              gap={2}
            >
              <Button variant="outline">Cancelar</Button>
              <Button
                isLoading={isCreating}
                colorScheme="brand"
                onClick={() => {}}
                type="submit"
              >
                Criar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default AddOptionModal
