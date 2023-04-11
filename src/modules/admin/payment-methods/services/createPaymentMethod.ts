import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const createPaymentMethod = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const paymentMethod = await prisma.storePaymentMethod.create({
      data: {
        ...req.body,
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

export default createPaymentMethod
