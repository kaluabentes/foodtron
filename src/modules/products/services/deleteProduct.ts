import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"

const deleteProduct = async (id: string, res: NextApiResponse) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(200).send(product)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default deleteProduct
