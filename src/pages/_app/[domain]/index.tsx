import React, { useEffect, useState } from "react"
import {
  Box,
  Container,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { motion } from "framer-motion"

import prisma from "@/lib/providers/prisma/client"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/components/StoreInfo"
import Store from "@/modules/admin/stores/types/Store"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useRouter } from "next/router"
import Category from "@/modules/admin/categories/types/Category"
import CategoryItem from "@/modules/app/components/CategoryItem"
import OrderProductModal, {
  OrderProductValues,
} from "@/modules/app/components/order/OrderProductModal"
import Product from "@/modules/admin/products/types/Product"
import useBottomToast from "@/lib/hooks/useBottomToast"
import useGetStore from "@/modules/admin/stores/hooks/useGetStore"
import FilterBar from "@/modules/app/components/FilterBar"
import useCurrentAddress from "@/modules/app/addresses/hooks/useCurrentAddress"
import formatAddress from "@/modules/app/addresses/lib/formatAddress"
import Location from "@/modules/admin/locations/types/Location"
import match from "@/lib/helpers/string/match"
import sortCategories from "@/modules/admin/categories/lib/sortCategories"
import StoreInfoDesktop from "@/modules/app/components/StoreInfoDesktop"
import MyOrder from "@/modules/app/components/MyOrder"
import Schedule from "@/modules/admin/schedules/types/Schedule"

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
    revalidate: 2,
  }
}

interface IndexProps {
  store: Store
  categories: Category[]
}

const Index = ({ store = {}, categories }: IndexProps) => {
  const router = useRouter()
  const toast = useBottomToast()

  const { store: storeRealTime } = useGetStore(String(store.subdomain))
  const currentStore = storeRealTime || store

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  })

  const {
    setState,
    state: {
      order: { products: orderProducts },
    },
  } = useAppContext()

  const currentAddress = useCurrentAddress()
  const location = (currentAddress?.location || {}) as Location
  const assembledAddress = currentAddress
    ? formatAddress(currentAddress!)
    : undefined

  const currentDay = new Date().getDay()
  const currentSchedule = currentStore!.schedules!.find(
    (schedule: Schedule) => schedule.weekDay === String(currentDay)
  )
  const isEnabled = currentSchedule?.isEnabled
  const currentWeekDay = String(weekDayMap.get(currentSchedule?.weekDay))
  const currentScheduleTime = `${currentSchedule?.start} ás ${currentSchedule?.end}`

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  const computeFilters = (categoriesList: Category[]): Category[] => {
    if (filters.search) {
      return categoriesList
        .map((category) => ({
          ...category,
          products: category.products?.filter(
            (product) =>
              match(filters.search, product.title) ||
              match(filters.search, product.description)
          ),
        }))
        .filter((category) => category.products?.length! > 0)
    }

    if (filters.category) {
      const category = categories.find(
        (category) => category.id === filters.category
      )

      return [category!]
    }

    return categoriesList
  }

  const handleOrderConfirm = (values: OrderProductValues) => {
    const id = uuidv4()
    const options = values.optionGroupValues
      .map((opt) => opt.options)
      .flat()
      .filter((opt) => Number(opt?.quantity) > 0)

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

  const handleCartClick = () => {
    if (!orderProducts.length) {
      toast({
        title: "Atenção",
        description: "Adicione um produto",
        status: "error",
      })
      return
    }

    router.push("/order-confirm")
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
    <AppLayout
      title="Menu"
      hideTitle
      maxWidth={{ base: "100%", lg: "calc(100vw - 68px)" }}
      margin="initial"
    >
      <Flex gap={6}>
        <Box
          ml={{ lg: "68px" }}
          width={{ base: "100%", lg: "calc(100vw - 484px)" }}
          pt={{ lg: 6 }}
          pl={{ lg: 20 }}
          pr={{ lg: 20 }}
          pb={{ lg: 0 }}
        >
          <Box margin="0 auto" maxWidth="full">
            {useBreakpointValue({
              base: (
                <Box
                  borderRadius={{ lg: "md" }}
                  overflow="hidden"
                  boxShadow="sm"
                  mt={{ base: 0, md: 4 }}
                  mb={2}
                >
                  <StoreInfo
                    onInfoClick={() => router.push("/about")}
                    onSelectLocation={() => router.push("/addresses")}
                    weekDay={currentWeekDay}
                    isEnabled={isEnabled!}
                    schedule={currentScheduleTime}
                    store={currentStore}
                    location={location}
                  />
                </Box>
              ),
              lg: (
                <StoreInfoDesktop
                  onInfoClick={() => router.push("/about")}
                  onSelectLocation={() => router.push("/addresses")}
                  weekDay={currentWeekDay}
                  isEnabled={isEnabled!}
                  schedule={currentScheduleTime}
                  store={currentStore}
                  location={location}
                />
              ),
            })}
            {useBreakpointValue({
              base: (
                <AddressSelectButton
                  onClick={() => router.push("/addresses")}
                  address={assembledAddress}
                />
              ),
              lg: null,
            })}
            <FilterBar
              search={filters.search}
              categories={categories}
              category={filters.category}
              onCategoryChange={(category: string) =>
                setFilters((prev) => ({
                  ...prev,
                  category,
                }))
              }
              onSearchChange={(search: string) =>
                setFilters((prev) => ({
                  ...prev,
                  search,
                }))
              }
            />
            <Flex
              direction="column"
              gap={{ base: 2, lg: 4 }}
              mb={{ base: 2, lg: 0 }}
            >
              {sortCategories(computeFilters(categories)).map((category) => (
                <CategoryItem
                  key={category?.id}
                  onMenuItemClick={handleMenuItemClick}
                  category={category!}
                />
              ))}
            </Flex>
            <OrderProductModal
              onConfirm={handleOrderConfirm}
              optionGroups={selectedProduct?.productOptionGroups?.map(
                (productOptionGroup) => productOptionGroup.optionGroup
              )}
              product={selectedProduct}
              isOpen={Boolean(selectedProduct)}
              onClose={() => setSelectedProduct(undefined)}
            />
          </Box>
        </Box>
        {useBreakpointValue({
          lg: (
            <MyOrder
              onConfirm={handleCartClick}
              onAddressClick={() => router.push("/addresses")}
              address={assembledAddress}
            />
          ),
        })}
      </Flex>
    </AppLayout>
  )
}

export default Index
