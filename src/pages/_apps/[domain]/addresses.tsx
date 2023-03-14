import { useAppContext } from "@/contexts/app"
import AppLayout from "@/layouts/AppLayout"
import auth from "@/middlewares/auth"
import OrderCard from "@/modules/app/components/order/OrderCard"
import Order from "@/modules/orders/types/Order"
import { ROLE } from "@/modules/users/constants"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import prisma from "@/lib/infra/prisma/client"
import StripeSeparator from "@/components/StripeSeparator"
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import { useSession } from "next-auth/react"
import EmptyState from "@/components/EmptyState"
import Address from "@/modules/addresses/types/Address"
import AddressCard from "@/modules/app/components/address/AddressCard"
import api from "@/lib/infra/axios/api"
import useBottomToast from "@/lib/hooks/useBottomToast"
import { BiPlus } from "react-icons/bi"
import ConfirmAlert from "@/components/ConfirmAlert"
import AddressParam from "@/modules/addresses/types/AddressParam"

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store: any) => ({
      params: {
        domain: store.subdomain,
        orderId: store.id,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const store = await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
  })

  return {
    props: {
      store,
    },
  }
}

const Addresses = () => {
  /* Infra */
  const router = useRouter()
  const toast = useBottomToast()

  const { mutateState, state } = useAppContext()
  const {
    user: { addresses, token, selectedAddressId },
  } = state

  const [isSelecting, setIsSelecting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>()
  const [addressToDelete, setAddressToDelete] = useState<Address | undefined>()

  const getAddresses = (headers: any): Promise<Address[]> =>
    api.get(`/api/addresses`, { headers }).then((response) => response.data)

  const handleDeleteAddress = async () => {
    const headers = {
      Authorization: token,
    }

    try {
      setIsDeleting(true)

      await api.delete(`/api/addresses/${addressToDelete?.id}`, {
        headers,
      })

      const addresses = await getAddresses(headers)

      mutateState({
        ...state,
        user: {
          ...state.user,
          addresses,
        },
      })
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        status: "error",
      })
    } finally {
      setIsDeleting(false)
      setAddressToDelete(undefined)
    }
  }

  const handleAddressSelect = async (address: Address) => {
    try {
      setIsSelecting(true)
      setSelectedAddress(address)
      const response = await api.patch(
        "/api/profile/update-user",
        {
          selectedAddressId: address.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      mutateState({
        ...state,
        user: {
          ...state.user,
          selectedAddressId: response.data.selectedAddressId,
        },
      })

      toast({
        title: "Feito!",
        description: "O endereço foi selecionado para entrega",
        status: "success",
      })
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        status: "error",
      })
    } finally {
      setIsSelecting(false)
      setSelectedAddress(undefined)
    }
  }

  useEffect(() => {
    const fetchAddresses = async (token: string) => {
      const headers = {
        Authorization: token,
      }

      try {
        const addresses = await getAddresses(headers)

        mutateState({
          ...state,
          user: {
            ...state.user,
            addresses,
          },
        })
      } catch (error: any) {
        toast({
          title: "Atenção!",
          description: error.message,
          status: "error",
        })
      }
    }

    if (token) {
      fetchAddresses(token)
    }
  }, [token])

  const renderOrders = () => {
    if (!addresses.length) {
      return <EmptyState message="Não há endereços ainda" />
    }

    return addresses
      .slice()
      .reverse()
      .map((address) => (
        <AddressCard
          key={address.id}
          onSelect={() => handleAddressSelect(address)}
          onEdit={() => router.push(`/edit-address?id=${address.id}`)}
          onDelete={() => setAddressToDelete(address)}
          address={address}
          isSelecting={isSelecting && address.id === selectedAddress?.id}
          isDisabled={selectedAddressId === address.id}
        />
      ))
  }

  return (
    <AppLayout title="Seus endereços">
      {!token && <UserAccountWarning />}
      <Flex
        direction="column"
        gap={4}
        borderRadius="md"
        overflow="hidden"
        shadow="sm"
        p={{ base: 4, md: 0 }}
      >
        <Flex
          gap={4}
          mt={{ base: 0, md: 4 }}
          p={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
        >
          <Button
            onClick={() => router.push("/add-address")}
            leftIcon={<BiPlus />}
            variant="outline"
          >
            Adicionar
          </Button>
        </Flex>
        {renderOrders()}
      </Flex>
      {addressToDelete && (
        <ConfirmAlert
          isLoading={isDeleting}
          isOpen={Boolean(addressToDelete)}
          title="Atenção"
          description="Você tem certeza que deseja apagar este endereço?"
          onClose={() => setAddressToDelete(undefined)}
          onConfirm={handleDeleteAddress}
        />
      )}
    </AppLayout>
  )
}

export default Addresses
