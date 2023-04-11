import prisma from "@/lib/providers/prisma/client"
import { ORDER_STATUS } from "../constants"

const getOrders = (storeId: string, isArchive = false) => {
  return prisma.order.findMany({
    where: {
      storeId,
      status: {
        in: isArchive
          ? [ORDER_STATUS.DONE, ORDER_STATUS.CANCELLED]
          : [ORDER_STATUS.PENDING, ORDER_STATUS.DELIVERY, ORDER_STATUS.DOING],
      },
    },
    include: {
      orderProducts: {
        include: {
          options: true,
        },
      },
      orderStatuses: true,
    },
  })
}

export default getOrders
