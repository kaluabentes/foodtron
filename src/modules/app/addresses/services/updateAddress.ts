import Address from "../types/Address"

import prisma from "@/lib/providers/prisma/client"

const updateAddress = (id: string, data: Address) =>
  prisma.address.update({
    where: {
      id,
    },
    data: {
      street: data.street,
      number: data.number,
      location: {
        connect: {
          id: data.location.id,
        },
      },
    },
    include: {
      location: true,
    },
  })

export default updateAddress
