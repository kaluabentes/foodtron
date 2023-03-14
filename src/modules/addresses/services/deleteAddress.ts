import prisma from "@/lib/infra/prisma/client"

const deleteAddress = (id: string) =>
  prisma.address.delete({
    where: {
      id,
    },
  })

export default deleteAddress
