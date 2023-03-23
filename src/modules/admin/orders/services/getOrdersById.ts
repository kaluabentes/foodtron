import prisma from "@/lib/infra/prisma/client"

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
    },
  })

export default getOrdersById
