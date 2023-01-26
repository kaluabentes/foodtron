import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import Product from "../types/Product"

const updateProduct = async (
  id: string,
  data: Product,
  res: NextApiResponse
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: String(id),
      },
      data,
    })

    return res.status(200).send(product)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default updateProduct
