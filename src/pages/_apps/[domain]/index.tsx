import React, { useEffect } from "react"
import { Box } from "@chakra-ui/react"

import prisma from "@/lib/infra/prisma"
import AppLayout from "@/layouts/AppLayout"
import AddressSelectButton from "@/modules/app/home/components/AddressSelectButton"
import { useAppContext } from "@/contexts/app"
import StoreInfo from "@/modules/app/home/components/StoreInfo"
import Store from "@/modules/admin/store/types/Store"
import weekDayMap from "@/modules/admin/schedules/weekDayMap"
import { useRouter } from "next/router"

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
  const store = (await prisma.store.findFirst({
    where: {
      subdomain: params.domain,
    },
    include: {
      schedules: true,
    },
  })) as Store

  return {
    props: {
      store: {
        ...store,
        minimumOrderPrice: Number(store?.minimumOrderPrice).toFixed(2),
      },
    },
  }
}

interface IndexProps {
  store: Store
}

const Index = ({ store }: IndexProps) => {
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
  const currentWeekDay = weekDayMap.get(currentSchedule?.weekDay)
  const currentScheduleTime = `${currentSchedule?.start} ás ${currentSchedule?.end}`

  return (
    <AppLayout title="Home">
      <Box
        shadow="sm"
        backgroundColor="white"
        borderRadius="md"
        overflow="hidden"
        marginBottom={8}
      >
        <AddressSelectButton
          address={(street || number || neighborhood) && address}
        />
        <StoreInfo
          onSelectLocation={() => router.push("/select-location")}
          weekDay={currentWeekDay}
          schedule={currentScheduleTime}
          store={store}
          location={location}
        />
      </Box>
    </AppLayout>
  )
}

export default Index
