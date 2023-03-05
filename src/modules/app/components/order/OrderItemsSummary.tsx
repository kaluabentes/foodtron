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

import { useAppContext } from "@/contexts/app"
import { useRouter } from "next/router"
import OrderProduct from "@/modules/orders/types/OrderProduct"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import OrderProductModal, {
  OrderProductValues,
} from "@/modules/app/components/order/OrderProductModal"
import useGetProducts from "@/modules/products/hooks/useGetProducts"
import Product from "@/modules/products/types/Product"
import OptionGroup from "@/modules/options/types/OptionGroup"
import Option from "@/modules/options/types/Option"
import OrderOptionsModal from "@/modules/app/components/order/OrderOptionsModal"
import OrderProductItem from "@/modules/app/components/order/OrderProductItem"
import BaseOrderItem from "@/modules/app/components/order/BaseOrderItem"
import sumProductTotal from "@/modules/orders/lib/sumProductTotal"
import sumOrderSubtotal from "@/modules/orders/lib/sumOrderSubtotal"

const OrderItemsSummary = () => {
  const router = useRouter()
  const { domain } = router.query

  const { setState, resetState, state } = useAppContext()
  const {
    order: { products: orderProducts },
    address: {
      location: { tax },
    },
  } = state

  const { products } = useGetProducts(String(domain))
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([])
  const [orderProductId, setOrderProductId] = useState("")
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)

  const removeOrderProduct = (orderProductId: string) => {
    resetState({
      ...state,
      order: {
        ...state.order,
        products: orderProducts!.filter(
          (orderProduct: OrderProduct) => orderProduct.id !== orderProductId
        ),
      },
    })
  }

  const handleEditOrderConfirm = (values: OrderProductValues) => {
    const options = values.optionGroupValues
      .map((opt) => opt.options)
      .flat()
      .filter((opt) => Number(opt?.quantity) > 0)

    const orderProductData = {
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
            return orderProductData
          }

          return orderProduct
        }),
      },
    })
    setSelectedProduct(undefined)
    setProductId("")
    setOrderProductId("")
  }

  const handleEditProduct = (orderProductId: string, productId: string) => {
    setOrderProductId(orderProductId)
    setProductId(productId)
  }

  const editProduct = (orderProductId: string, productId: string) => {
    const orderProduct = orderProducts.find(
      (product: OrderProduct) => product.id === orderProductId
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
    setQuantity(orderProduct.quantity)
  }

  return (
    <>
      <Flex
        direction="column"
        shadow="sm"
        backgroundColor="white"
        borderRadius={{ base: undefined, lg: "md" }}
        overflow="hidden"
      >
        {orderProducts.map((product: OrderProduct) => (
          <OrderProductItem
            key={product.id}
            product={product}
            productTotal={formatToRealCurrency(sumProductTotal(product))}
            onClick={() => handleEditProduct(product.id!, product.productId!)}
          />
        ))}
        <BaseOrderItem
          leftSlot={<Text>Subtotal</Text>}
          rightSlot={
            <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
              {formatToRealCurrency(sumOrderSubtotal(orderProducts))}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text>Taxa de entrega</Text>}
          rightSlot={
            <Text fontSize="md" fontWeight="500" mb={1} textAlign="right">
              {tax ? formatToRealCurrency(Number(tax)) : "---"}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text>Total</Text>}
          rightSlot={
            <Text
              fontSize="md"
              fontWeight="500"
              mb={1}
              textAlign="right"
              color="brand.500"
            >
              {formatToRealCurrency(
                tax
                  ? sumOrderSubtotal(orderProducts) + Number(tax)
                  : sumOrderSubtotal(orderProducts)
              )}
            </Text>
          }
        />
      </Flex>
      <OrderProductModal
        onConfirm={handleEditOrderConfirm}
        optionGroups={optionGroups}
        product={selectedProduct}
        defaultQuantity={quantity}
        isOpen={Boolean(selectedProduct)}
        onClose={() => {
          setSelectedProduct(undefined)
          setProductId("")
          setOrderProductId("")
        }}
      />
      <OrderOptionsModal
        onRemove={() => {
          removeOrderProduct(orderProductId)
          setProductId("")
          setOrderProductId("")
        }}
        onClose={() => {
          setProductId("")
          setOrderProductId("")
        }}
        onEdit={() => editProduct(orderProductId, productId)}
        isOpen={Boolean(orderProductId)}
      />
    </>
  )
}

export default OrderItemsSummary
