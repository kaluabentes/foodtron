import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"

const getProducts = async (res: NextApiResponse, storeId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
      },
    })

    return res.status(200).send(products)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default getProducts
