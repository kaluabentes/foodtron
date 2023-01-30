import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"

const deleteProduct = async (id: string, res: NextApiResponse) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: String(id),
      },
      include: {
        optionGroups: true,
      },
    })

    await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        optionGroups: {
          disconnect: product?.optionGroups.map((opt) => ({ id: opt.id })),
        },
      },
    })

    await prisma.product.delete({
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
