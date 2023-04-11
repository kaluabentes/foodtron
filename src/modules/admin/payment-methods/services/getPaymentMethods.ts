import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const getPaymentMethods = async (res: NextApiResponse, storeId: string) => {
  try {
    const paymentMethods = await prisma.storePaymentMethod.findMany({
      where: {
        storeId,
      },
    })

    return res.status(200).send(paymentMethods)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default getPaymentMethods
