import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const getStore = async ({
  storeId,
  domain,
}: {
  storeId?: string
  domain?: string
}) => {
  return await prisma.store.findFirst({
    where: {
      id: storeId,
      subdomain: domain,
    },
    include: {
      schedules: true,
    },
  })
}

export default getStore
