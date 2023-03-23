import prisma from "@/lib/infra/prisma/client"

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
    },
  })
}

export default getOrder
