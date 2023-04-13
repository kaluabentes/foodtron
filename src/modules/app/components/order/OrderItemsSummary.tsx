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
import OrderProduct from "@/modules/admin/orders/types/OrderProduct"
import formatToRealCurrency from "@/lib/helpers/number/formatToRealCurrency"
import OrderProductModal, {
  OrderProductValues,
} from "@/modules/app/components/order/OrderProductModal"
import useGetProducts from "@/modules/admin/products/hooks/useGetProducts"
import Product from "@/modules/admin/products/types/Product"
import OptionGroup from "@/modules/admin/options/types/OptionGroup"
import Option from "@/modules/admin/options/types/Option"
import OrderOptionsModal from "@/modules/app/components/order/OrderOptionsModal"
import OrderProductItem from "@/modules/app/components/order/OrderProductItem"
import BaseOrderItem from "@/modules/app/components/order/BaseOrderItem"
import sumProductTotal from "@/modules/admin/orders/lib/sumProductTotal"
import sumOrderSubtotal from "@/modules/admin/orders/lib/sumOrderSubtotal"
import useCurrentAddress from "@/modules/app/addresses/hooks/useCurrentAddress"
import EmptyState from "@/components/EmptyState"
import { FaRegSadCry } from "react-icons/fa"
import StripeSeparator from "@/components/StripeSeparator"

interface OrderItemsSummaryProps {
  section?: "all" | "items" | "summary"
  hideMinimumPrice?: boolean
}

const OrderItemsSummary = ({
  section = "all",
  hideMinimumPrice = false,
}: OrderItemsSummaryProps) => {
  const router = useRouter()
  const { domain } = router.query

  const { setState, mutateState, state } = useAppContext()
  const {
    order: { products: orderProducts },
    store: { minimumOrderPrice },
  } = state
  const address = useCurrentAddress()

  const { products } = useGetProducts(String(domain))
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([])
  const [orderProductId, setOrderProductId] = useState("")
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const clear = () => {
    setProductId("")
    setOrderProductId("")
  }

  const removeOrderProduct = (orderProductId: string) => {
    mutateState({
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

  const handleAction = (orderProductId: string, productId: string) => {
    setIsOptionsOpen(true)
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

  const renderItems = () => {
    if (section === "summary") {
      return null
    }

    if (!orderProducts.length) {
      return (
        <Box p={6}>
          <EmptyState
            message="Nada aqui por enquanto"
            isGray
            icon={FaRegSadCry}
          />
        </Box>
      )
    }

    return orderProducts.map((product: OrderProduct) => (
      <OrderProductItem
        key={product.id}
        product={product}
        productTotal={formatToRealCurrency(sumProductTotal(product))}
        onClick={() => handleAction(product.id!, product.productId!)}
      />
    ))
  }

  const renderSummary = () => {
    if (section === "items") {
      return null
    }

    return (
      <>
        {!hideMinimumPrice && (
          <BaseOrderItem
            leftSlot={<Text fontWeight="500">Pedido mínimo</Text>}
            rightSlot={
              <Text fontSize="md" mb={1} textAlign="right">
                {formatToRealCurrency(Number(minimumOrderPrice))}
              </Text>
            }
          />
        )}
        <BaseOrderItem
          leftSlot={<Text fontWeight="500">Subtotal</Text>}
          rightSlot={
            <Text fontSize="md" mb={1} textAlign="right">
              {formatToRealCurrency(sumOrderSubtotal(orderProducts))}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text fontWeight="500">Taxa de entrega</Text>}
          rightSlot={
            <Text fontSize="md" mb={1} textAlign="right">
              {address
                ? formatToRealCurrency(Number(address?.location?.tax))
                : "---"}
            </Text>
          }
        />
        <BaseOrderItem
          leftSlot={<Text fontWeight="500">Total</Text>}
          rightSlot={
            <Text
              fontSize="md"
              fontWeight="500"
              mb={1}
              textAlign="right"
              color="brand.500"
            >
              {formatToRealCurrency(
                address
                  ? sumOrderSubtotal(orderProducts) +
                      Number(address?.location?.tax)
                  : sumOrderSubtotal(orderProducts)
              )}
            </Text>
          }
        />
      </>
    )
  }

  return (
    <>
      <Flex
        direction="column"
        backgroundColor="white"
        borderRadius={{ base: undefined, lg: "md" }}
        overflow="hidden"
      >
        {renderItems()}
        {renderSummary()}
      </Flex>
      {isOptionsOpen && (
        <OrderOptionsModal
          onRemove={() => {
            removeOrderProduct(orderProductId)
            clear()
          }}
          onClose={() => {
            setIsOptionsOpen(false)
            clear()
          }}
          onEdit={() => {
            setIsOptionsOpen(false)
            editProduct(orderProductId, productId)
          }}
          isOpen={isOptionsOpen}
        />
      )}
      <OrderProductModal
        onConfirm={handleEditOrderConfirm}
        optionGroups={optionGroups}
        product={selectedProduct}
        defaultQuantity={quantity}
        isOpen={Boolean(selectedProduct)}
        onClose={() => {
          setSelectedProduct(undefined)
          clear()
        }}
      />
    </>
  )
}

export default OrderItemsSummary
