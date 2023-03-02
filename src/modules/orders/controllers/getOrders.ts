import prisma from "@/lib/infra/prisma/client"

const getOrders = (storeId: string) => {
  return prisma.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderProducts: {
        include: {
          options: true,
        },
      },
    },
  })
}

export default getOrders
