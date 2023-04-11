import prisma from "@/lib/providers/prisma/client"

const getOrder = (id: string) => {
  return prisma.order.findFirst({
    where: {
      id,
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

export default getOrder
