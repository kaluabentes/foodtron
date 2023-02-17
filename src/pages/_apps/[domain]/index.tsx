import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/components/StoreInfo"
import Store from "@/modules/stores/types/Store"
import weekDayMap from "@/modules/schedules/weekDayMap"
import { useRouter } from "next/router"
import Category from "@/modules/categories/types/Category"
import CategoryItem from "@/modules/app/components/CategoryItem"
import OrderProductModal, {
  OrderProductValues,
} from "@/modules/app/components/OrderProductModal"
import Product from "@/modules/products/types/Product"
import useBottomToast from "@/lib/hooks/useBottomToast"
import useGetStore from "@/modules/stores/hooks/useGetStore"

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
  const store = await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
    include: {
      schedules: true,
    },
  })

  const categories = await prisma.category.findMany({
    where: {
      storeId: store?.id,
    },
    include: {
      products: {
        include: {
          productOptionGroups: {
            include: {
              optionGroup: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      store: {
        ...store,
        minimumOrderPrice: Number(store?.minimumOrderPrice).toFixed(2),
      },
      categories: categories.map((category) => ({
        ...category,
        products: category.products.map((product) => ({
          ...product,
          price: product.price.toFixed(2),
          productOptionGroups: product.productOptionGroups.map(
            (productOptionGroup) => ({
              ...productOptionGroup,
              optionGroup: {
                ...productOptionGroup.optionGroup,
                options: productOptionGroup.optionGroup?.options.map(
                  (option) => ({
                    ...option,
                    price: option.price ? option.price.toFixed(2) : null,
                  })
                ),
              },
            })
          ),
        })),
      })),
    },
    revalidate: 5,
  }
}

interface IndexProps {
  store: Store
  categories: Category[]
}

const Index = ({ store, categories }: IndexProps) => {
  const router = useRouter()
  const toast = useBottomToast()
  const { store: storeRealTime } = useGetStore(String(store.subdomain))

  const {
    setState,
    state: {
      address: {
        street,
        number,
        location: { neighborhood, ...location },
      },
      order: { products: orderProducts },
    },
  } = useAppContext()

  const address = `${street || "---"}, ${number || "---"}, ${neighborhood}`

  const currentDay = new Date().getDay()
  const currentSchedule = store!.schedules!.find(
    (schedule) => schedule.weekDay === String(currentDay)
  )
  const currentWeekDay = String(weekDayMap.get(currentSchedule?.weekDay))
  const currentScheduleTime = `${currentSchedule?.start} ás ${currentSchedule?.end}`

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const handleOrderConfirm = (values: OrderProductValues) => {
    const id = uuidv4()
    const options = values.optionGroupValues
      .map((opt) => opt.options)
      .flat()
      .filter((opt) => Number(opt?.quantity) > 0)

    console.log("id", id)

    const productPayload = {
      id,
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
        products: [...orderProducts, productPayload],
      },
    })
    setSelectedProduct(undefined)
  }

  const handleMenuItemClick = (product: Product) => {
    if (!storeRealTime.isOpen) {
      toast({
        title: "Atenção",
        description: "O restaurante está fechado no momento",
        status: "error",
      })
      return
    }

    setSelectedProduct(product)
  }

  return (
    <AppLayout title="Menu">
      <Box borderRadius="md" overflow="hidden" boxShadow="sm">
        <AddressSelectButton
          onClick={() => router.push("/edit-address")}
          address={(street || number || neighborhood) && address}
        />
        <StoreInfo
          onSelectLocation={() => router.push("/select-location")}
          weekDay={currentWeekDay}
          schedule={currentScheduleTime}
          store={storeRealTime || store}
          location={location}
        />
      </Box>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          onMenuItemClick={handleMenuItemClick}
          category={category}
        />
      ))}
      <OrderProductModal
        onConfirm={handleOrderConfirm}
        optionGroups={selectedProduct?.productOptionGroups?.map(
          (productOptionGroup) => productOptionGroup.optionGroup
        )}
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(undefined)}
      />
    </AppLayout>
  )
}

export default Index
