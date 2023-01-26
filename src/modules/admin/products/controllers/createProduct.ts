import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import { Prisma } from "@prisma/client"
import OptionGroup from "../types/OptionGroup"
import Option from "../types/Option"

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const { price } = req.body

    const product = await prisma.product.create({
      data: {
        ...req.body,
        price: new Prisma.Decimal(price.replace(",", ".")),
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    })

    return res.status(201).send(product)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createProduct
