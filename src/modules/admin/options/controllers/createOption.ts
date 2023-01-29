import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import { Prisma } from "@prisma/client"
import OptionGroup from "../types/OptionGroup"
import Option from "../types/Option"

const createOption = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const { options } = req.body
    const option = await prisma.optionGroup.create({
      data: {
        ...req.body,
        store: {
          connect: {
            id: storeId,
          },
        },
        options: {
          create: (options || []).map((option: Option) => ({
            ...option,
            price: new Prisma.Decimal(option.price.replace(",", ".")),
          })),
        },
      },
    })

    return res.status(201).send(option)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createOption
