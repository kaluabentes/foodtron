import { GetStaticProps } from "next"
import React from "react"
import { BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs"

import prisma from "@/lib/infra/prisma"
import { useTranslation } from "react-i18next"
import useIsPageLoaded from "@/lib/hooks/useIsPageLoaded"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import StoreMidiaUpload from "@/components/StoreMidiaUpload"
import { Store } from "@prisma/client"
import TruncateText from "@/components/TruncateText"

interface IndexProps {
  store: Store
}

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store) => ({
      params: {
        site: store.subdomain,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const store = await prisma.store.findFirst({
    where: {
      subdomain: params.site,
    },
  })

  return {
    props: {
      store,
    },
  }
}

const Index = ({ store }: IndexProps) => {
  const { t } = useTranslation()
  const isPageLoaded = useIsPageLoaded()
  const boxShadow = useColorModeValue("md", "md-dark")
  const boxBackground = useColorModeValue("white", "gray.800")

  return (
    <Container maxWidth="container.lg" as="main" p="0">
      {!isPageLoaded && (
        <Flex padding={10} align="center" justifyContent="center">
          <Spinner colorScheme="brand" />
        </Flex>
      )}
      {isPageLoaded && (
        <>
          <Box
            boxShadow={boxShadow}
            backgroundColor={boxBackground}
            borderRadius={{ base: "0", md: 10 }}
            overflow="hidden"
            marginBottom={8}
          >
            <StoreMidiaUpload
              defaultCover={store.cover!}
              defaultLogo={store.logo!}
              isEditable={false}
            />
            <Box p={4}>
              <Heading
                marginTop={4}
                textAlign="center"
                size="md"
                marginBottom={4}
              >
                {store.name}
              </Heading>
              <Text textAlign="center" color="gray.500" fontSize="sm" mb={4}>
                {store.address}
              </Text>
              <Flex justifyContent="center" gap={2} mb={8}>
                <IconButton
                  variant="outline"
                  aria-label="Send email"
                  icon={<BsFacebook />}
                />
                <IconButton
                  variant="outline"
                  aria-label="Send email"
                  icon={<BsInstagram />}
                />
              </Flex>
              <Button
                colorScheme="whatsapp"
                width="full"
                leftIcon={<BsWhatsapp />}
              >
                Conversar
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  )
}

export default Index
