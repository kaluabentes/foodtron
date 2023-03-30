import { Order } from "@prisma/client"

import prisma from "@/lib/infra/prisma/client"

const updateOrder = (id: string, data: Order) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      ...data,
      orderStatuses: {
        create: [{ status: data.status }],
      },
    },
  })
}

export default updateOrder
