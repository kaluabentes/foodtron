import prisma from "@/lib/providers/prisma/client"

const getAddresses = (userId: string) =>
  prisma.address.findMany({
    where: {
      userId,
    },
    include: {
      location: true,
    },
  })

export default getAddresses
