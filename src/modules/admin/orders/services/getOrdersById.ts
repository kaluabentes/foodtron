import prisma from "@/lib/providers/prisma/client"

const getOrdersById = (ids: string[]) =>
  prisma.order.findMany({
    where: {
      id: {
        in: ids,
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

export default getOrdersById
