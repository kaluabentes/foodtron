import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"

const getStore = async (res: NextApiResponse, storeId: string) => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
      },
    })

    return res.status(200).send(store)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default getStore
