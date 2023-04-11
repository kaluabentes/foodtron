import prisma from "@/lib/providers/prisma/client"

const deleteAddress = (id: string) =>
  prisma.address.delete({
    where: {
      id,
    },
  })

export default deleteAddress
