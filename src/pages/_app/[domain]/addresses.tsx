import { useAppContext } from "@/contexts/app"
import AppLayout from "@/layouts/AppLayout"
import { Button, Flex } from "@chakra-ui/react"
import prisma from "@/lib/providers/prisma/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import UserAccountWarning from "@/modules/app/components/UserAccountWarning"
import EmptyState from "@/components/EmptyState"
import Address from "@/modules/app/addresses/types/Address"
import AddressCard from "@/modules/app/components/address/AddressCard"
import api from "@/lib/providers/axios/api"
import useBottomToast from "@/lib/hooks/useBottomToast"
import { BiPlus } from "react-icons/bi"
import ConfirmAlert from "@/components/ConfirmAlert"

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
  return {
    props: {
      subdomain: params.domain,
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
    try {
      setIsDeleting(true)

      if (token) {
        const headers = {
          Authorization: token,
        }

        await api.delete(`/api/addresses/${addressToDelete?.id}`, {
          headers,
        })

        const addresses = await getAddresses(headers)

        mutateState({
          ...state,
          user: {
            ...state.user,
            addresses,
            selectedAddressId: "",
          },
        })
      } else {
        mutateState({
          ...state,
          user: {
            ...state.user,
            selectedAddressId: "",
            addresses: state.user.addresses.filter(
              (address) => address.id !== addressToDelete?.id
            ),
          },
        })
      }
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

      if (token) {
        await api.patch(
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
      }

      mutateState({
        ...state,
        user: {
          ...state.user,
          selectedAddressId: address.id,
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

    return new Array(50)
      .fill(addresses)
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
          isSelected={selectedAddressId === address.id}
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
        p={{ base: 4, md: 0 }}
      >
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
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
