import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import PaymentMethod from "../types/PaymentMethod"

const updatePaymentMethod = async (
  res: NextApiResponse,
  id: string,
  data: PaymentMethod
) => {
  try {
    const paymentMethod = await prisma.storePaymentMethod.update({
      where: {
        id,
      },
      data,
    })

    return res.status(200).send(paymentMethod)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default updatePaymentMethod
