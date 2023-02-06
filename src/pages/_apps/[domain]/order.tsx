import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"

import AppLayout from "@/layouts/AppLayout"
import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import Location from "@/modules/locations/types/Location"
import BarIconButton from "@/components/BarIconButton"
import { BiLeftArrowAlt } from "react-icons/bi"
import OrderProduct from "@/modules/orders/types/OrderProduct"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import prisma from "@/lib/infra/prisma/client"
import OrderModal, {
  OrderProductValues,
} from "@/modules/app/components/OrderProductModal"
import useGetProducts from "@/modules/products/hooks/useGetProducts"
import Product from "@/modules/products/types/Product"
import OptionGroup from "@/modules/options/types/OptionGroup"
import { ProductOptionGroup } from "@prisma/client"
import Option from "@/modules/options/types/Option"
import useBottomToast from "@/lib/hooks/useBottomToast"

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
  return {
    props: {
      domain: params.domain,
    },
  }
}

const Order = () => {
  const router = useRouter()
  const { domain } = router.query
  const toast = useBottomToast()

  const {
    setState,
    state: {
      order: { products: orderProducts },
      address: {
        street,
        number,
        location: { tax },
      },
    },
  } = useAppContext()

  const { products } = useGetProducts(String(domain))
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([])
  const [orderProductId, setOrderProductId] = useState("")

  const getSubtotal = () => {
    return orderProducts.reduce(
      (total, product) => total + getProductTotal(product),
      0
    )
  }

  const getProductTotal = (product: OrderProduct) => {
    return (
      Number(product.price) * product.quantity +
      product.options!.reduce(
        (total, opt) => total + opt.quantity * Number(opt.price),
        0
      )
    )
  }

  const handleOrderConfirm = (values: OrderProductValues) => {
    const options = values.optionGroupValues
      .map((opt) => opt.options)
      .flat()
      .filter((opt) => Number(opt?.quantity) > 0)

    const productPayload = {
      id: orderProductId,
      productId: selectedProduct!.id,
      title: selectedProduct!.title,
      price: selectedProduct!.price,
      image: selectedProduct!.image,
      quantity: values.quantity,
      observation: values.observation,
      options: options.map((opt) => ({
        id: opt?.id,
        title: opt!.title,
        quantity: Number(opt!.quantity),
        price: opt!.price,
      })),
    }

    setState({
      order: {
        products: orderProducts!.map((orderProduct: OrderProduct) => {
          if (orderProduct.id === orderProductId) {
            return productPayload
          }

          return orderProduct
        }),
      },
    })
    setSelectedProduct(undefined)
  }

  const handleAdvance = () => {
    if (!tax || !street || !number) {
      toast({
        title: "Atenção",
        description: "Complete o seu endereço",
        status: "error",
      })
      return
    }
  }

  const handleEditProduct = (id: string, productId: string) => {
    const orderProduct = orderProducts.find(
      (product: OrderProduct) => product.id === id
    ) as any
    const orderSelectedOptions = orderProduct.options
    const product = products.find(
      (product: Product) => product.id === productId
    ) as any
    const orderOptionGroups = product?.productOptionGroups.map(
      (product: any) => product.optionGroup
    )

    const getOptionQuantity = (optionId: string) => {
      const option = orderSelectedOptions.find(
        (opt: Option) => opt.id === optionId
      )

      if (option) {
        return option.quantity
      }

      return 0
    }

    console.log("products", products)

    setOrderProductId(orderProduct.id)
    setOptionGroups(
      orderOptionGroups.map((orderOptionGroup: OptionGroup) => ({
        ...orderOptionGroup,
        options: orderOptionGroup!.options!.map((opt: Option) => ({
          ...opt,
          quantity: getOptionQuantity(String(opt.id)),
        })),
      }))
    )
    setSelectedProduct(product)
  }

  return (
    <AppLayout
      title="Pedido"
      rightIcon={
        <BarIconButton
          label="Voltar"
          onClick={() => router.push("/")}
          icon={<BiLeftArrowAlt />}
        />
      }
    >
      <Flex
        direction="column"
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="hidden"
        marginBottom={8}
        pl={5}
        pr={5}
      >
        <Table>
          <Tbody>
            {orderProducts.map((product: OrderProduct, index) => (
              <Tr
                key={String(index + 1)}
                onClick={() =>
                  handleEditProduct(product.id!, product.productId!)
                }
              >
                <Td p={5} pr={0} pl={0} verticalAlign="top">
                  <Heading fontSize="md" fontWeight="500" mb={1}>
                    {product.quantity} {product.title}
                  </Heading>
                  {product.options!.map((opt, index) => (
                    <Text
                      key={String(index + 1)}
                      fontSize="sm"
                      color="gray.500"
                      mb={1}
                    >
                      {opt.quantity} {opt.title}
                    </Text>
                  ))}
                  {product.observation && (
                    <Text pt={2} fontSize="xs" color="gray.500">
                      Obs.: {product.observation}
                    </Text>
                  )}
                </Td>
                <Td p={5} pr={0} pl={0} verticalAlign="top">
                  <Text textAlign="right" fontWeight="500" mb={1}>
                    {formatToRealCurrency(getProductTotal(product))}
                  </Text>
                  {product.options!.map((opt, optIndex) => (
                    <Text
                      key={String(optIndex + 1)}
                      textAlign="right"
                      fontSize="sm"
                      color="gray.500"
                      mb={1}
                    >
                      {formatToRealCurrency(Number(opt.price) * opt.quantity)}
                    </Text>
                  ))}
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td p={5} pr={0} pl={0}>
                <Text>Subtotal</Text>
              </Td>
              <Td p={5} pr={0} pl={0}>
                <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
                  {formatToRealCurrency(getSubtotal())}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td p={5} pr={0} pl={0}>
                <Text>Taxa de entrega</Text>
              </Td>
              <Td p={5} pr={0} pl={0}>
                <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
                  {tax ? (
                    formatToRealCurrency(Number(tax))
                  ) : (
                    <Text
                      as="button"
                      onClick={() =>
                        router.push("/edit-address?redirect=/order")
                      }
                      fontWeight="500"
                      fontSize="sm"
                      color="brand.500"
                    >
                      Selecionar
                    </Text>
                  )}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td p={5} pr={0} pl={0}>
                <Text fontWeight="500">Total</Text>
              </Td>
              <Td p={5} pr={0} pl={0}>
                <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
                  {formatToRealCurrency(
                    tax ? getSubtotal() + Number(tax) : getSubtotal()
                  )}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button mb={5} colorScheme="brand" onClick={handleAdvance}>
          Forma de pagamento
        </Button>
      </Flex>
      <OrderModal
        onConfirm={handleOrderConfirm}
        optionGroups={optionGroups}
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(undefined)}
      />
    </AppLayout>
  )
}

export default Order
