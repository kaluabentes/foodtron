import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const getLocations = async (storeId: string, res: NextApiResponse) => {
  try {
    const locations = await prisma.storeDeliveryLocation.findMany({
      where: {
        storeId,
      },
    })

    return res.status(200).send(locations)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default getLocations
