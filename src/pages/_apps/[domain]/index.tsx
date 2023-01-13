import React from "react"
import { BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs"

import prisma from "@/lib/infra/prisma"
import { useTranslation } from "react-i18next"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import { Store } from "@prisma/client"
import AppLayout from "@/layouts/AppLayout"
import { FaClock, FaEllipsisH, FaPlus } from "react-icons/fa"
import { BiChevronDown, BiMap, BiTimeFive } from "react-icons/bi"
import StripeSeparator from "@/components/StripeSeparator"

interface IndexProps {
  store: Store
}

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store) => ({
      params: {
        domain: store.subdomain,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const store = (await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
  })) as Store

  return {
    props: {
      store: {
        ...store,
        minimumOrderPrice: Number(store?.minimumOrderPrice).toFixed(2),
      },
    },
  }
}

const Index = ({ store }: IndexProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")

  return (
    <AppLayout>
      <Box
        shadow="sm"
        backgroundColor={boxBackground}
        borderRadius="md"
        overflow="hidden"
        marginBottom={8}
      >
        <Flex as="button" alignItems="center" gap={2} p={3} width="100%">
          <Icon as={BiMap} color="brand.500" fontSize="30px" />
          <Flex direction="column" alignItems="flex-start" flex={1}>
            <Text fontSize="xs">Entregar em:</Text>
            <Text fontWeight="500" fontSize="sm">
              Rua Abel Botelho, 273
            </Text>
          </Flex>
          <Icon
            as={BiChevronDown}
            fontSize="22px"
            justifySelf="flex-end"
            color="gray.500"
          />
        </Flex>
        <StoreMidiaUpload
          defaultCover={store.cover!}
          defaultLogo={store.logo!}
          isEditable={false}
        />
        <Flex flexDirection="column" alignItems="center" p={4}>
          <Heading textAlign="center" size="md" fontWeight="500" mb={2}>
            {store.name}
          </Heading>
          <Text textAlign="center" color="gray.500" fontSize="sm" mb={5}>
            Lachonete
          </Text>
          <Flex alignItems="center" gap={2} mb={5}>
            <Icon as={BiTimeFive} />
            <Text as="span" fontWeight="500" lineHeight="0px">
              Dom
            </Text>
            <Text color="gray.600" lineHeight="0px">
              08:00 ás 23:00
            </Text>
          </Flex>
          <Flex gap={4} alignItems="center">
            <Flex direction="column" alignItems="center">
              <Text as="span" fontSize="14px">
                Tempo
              </Text>
              <Text as="span" fontWeight="500">
                48 Min
              </Text>
            </Flex>
            <StripeSeparator />
            <Flex direction="column" alignItems="center">
              <Text as="span" fontSize="14px">
                Taxa
              </Text>
              <Text as="span" fontWeight="500">
                R$ 15,00
              </Text>
            </Flex>
            <StripeSeparator />
            {store.isOpen ? (
              <Badge colorScheme="green">Aberto</Badge>
            ) : (
              <Badge colorScheme="red">Fechado</Badge>
            )}
          </Flex>

          {/* <Button colorScheme="whatsapp" width="full" leftIcon={<BsWhatsapp />}>
            Conversar
          </Button> */}
        </Flex>
      </Box>
    </AppLayout>
  )
}

export default Index
