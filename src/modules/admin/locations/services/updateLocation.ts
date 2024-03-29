import { Prisma } from "@prisma/client"
import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const updateLocation = async (id: string, data: any, res: NextApiResponse) => {
  try {
    const location = await prisma.storeDeliveryLocation.update({
      where: {
        id: String(id),
      },
      data: {
        ...data,
        tax: new Prisma.Decimal(data.tax.replace(",", ".")),
      },
    })

    return res.status(200).send(location)
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateLocation
