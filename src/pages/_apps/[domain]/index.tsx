import React, { useEffect, useState } from "react"
import { Box, Heading } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

import prisma from "@/lib/infra/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/components/StoreInfo"
import Store from "@/modules/store/types/Store"
import weekDayMap from "@/modules/schedules/weekDayMap"
import { useRouter } from "next/router"
import MenuItem from "@/modules/app/components/MenuItem"
import Category from "@/modules/categories/types/Category"
import CategoryItem from "@/modules/app/components/CategoryItem"
import OrderProductModal, {
  OrderProductValues,
} from "@/modules/app/components/OrderProductModal"
import Product from "@/modules/products/types/Product"

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
                    price: option.price.toFixed(2),
                  })
                ),
              },
            })
          ),
        })),
      })),
    },
  }
}

interface IndexProps {
  store: Store
  categories: Category[]
}

const Index = ({ store, categories }: IndexProps) => {
  const router = useRouter()

  const {
    setState,
    state: {
      address: {
        street,
        number,
        location: { neighborhood, ...location },
      },
      order: { products },
    },
  } = useAppContext()

  const address = `${street || "---"}, ${number || "---"}, ${neighborhood}`

  const currentDay = new Date().getDay()
  const currentSchedule = store.schedules.find(
    (schedule) => schedule.weekDay === String(currentDay)
  )
  const currentWeekDay = String(weekDayMap.get(currentSchedule?.weekDay))
  const currentScheduleTime = `${currentSchedule?.start} ás ${currentSchedule?.end}`

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const handleOrderConfirm = (values: OrderProductValues) => {
    const options = values.optionGroupValues
      .map((opt) => opt.options)
      .flat()
      .filter((opt) => Number(opt?.quantity) > 0)

    const productPayload = {
      id: uuidv4(),
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
        products: [...products, productPayload],
      },
    })
    setSelectedProduct(undefined)
  }

  return (
    <AppLayout title="Menu">
      <AddressSelectButton
        onClick={() => router.push("/edit-address")}
        address={(street || number || neighborhood) && address}
      />
      <StoreInfo
        onSelectLocation={() => router.push("/select-location")}
        weekDay={currentWeekDay}
        schedule={currentScheduleTime}
        store={store}
        location={location}
      />
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          onMenuItemClick={(product: Product) => setSelectedProduct(product)}
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
