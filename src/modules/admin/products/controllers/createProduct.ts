import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import { Prisma } from "@prisma/client"

import OptionGroup from "../../options/types/OptionGroup"

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const { price, optionGroups } = req.body

    const product = await prisma.product.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: new Prisma.Decimal(price.replace(",", ".")),
        store: {
          connect: {
            id: storeId,
          },
        },
        optionGroups: {
          connect: optionGroups.map((opt: OptionGroup) => ({
            id: opt.id,
          })),
        },
      },
    })

    return res.status(201).send(product)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createProduct
