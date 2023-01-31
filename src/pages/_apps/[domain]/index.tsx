import React, { useEffect, useState } from "react"
import { Box, Heading } from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/home/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/home/components/StoreInfo"
import Store from "@/modules/admin/store/types/Store"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useRouter } from "next/router"
import MenuItem from "@/modules/app/home/components/MenuItem"
import Category from "@/modules/admin/categories/types/Category"
import CategoryItem from "@/modules/app/home/components/CategoryItem"
import OrderModal from "@/modules/app/home/components/OrderModal"
import Product from "@/modules/admin/products/types/Product"

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
          optionGroups: {
            include: {
              options: true,
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
          optionGroups: product.optionGroups.map((optionGroup) => ({
            ...optionGroup,
            options: optionGroup.options.map((option) => ({
              ...option,
              price: option.price.toFixed(2),
            })),
          })),
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
    state: {
      address: {
        street,
        number,
        location: { neighborhood, ...location },
      },
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
          onMenuItemClick={(product: Product) => setSelectedProduct(product)}
          category={category}
        />
      ))}
      <OrderModal
        optionGroups={selectedProduct?.optionGroups}
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(undefined)}
      />
    </AppLayout>
  )
}

export default Index
