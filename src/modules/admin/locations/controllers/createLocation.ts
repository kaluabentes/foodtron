import { NextApiRequest, NextApiResponse } from "next"
import { Prisma } from "@prisma/client"

import prisma from "@/lib/infra/prisma"

const createLocation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const paymentMethod = await prisma.storeDeliveryLocation.create({
      data: {
        ...req.body,
        tax: new Prisma.Decimal(req.body.tax.replace(",", ".")),
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    })

    return res.status(201).send(paymentMethod)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createLocation
