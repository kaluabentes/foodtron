import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import Product from "../types/Product"
import { Prisma } from "@prisma/client"
import OptionGroup from "../../options/types/OptionGroup"

const updateProduct = async (id: string, data: any, res: NextApiResponse) => {
  try {
    await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        optionGroups: {
          disconnect: data.disconnectOptionGroups?.map((opt: OptionGroup) => ({
            id: opt.id,
          })),
        },
      },
    })

    const product = await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        price: new Prisma.Decimal(data.price.replace(",", ".")),
        optionGroups: {
          connect: data.optionGroups?.map((opt: OptionGroup) => ({
            id: opt.id,
          })),
        },
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    })

    return res.status(200).send(product)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default updateProduct
