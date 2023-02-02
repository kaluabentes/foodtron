import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"

const deletePaymentMethod = async (res: NextApiResponse, id: string) => {
  try {
    const paymentMethod = await prisma.storePaymentMethod.delete({
      where: {
        id,
      },
    })

    return res.status(200).send(paymentMethod)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default deletePaymentMethod
