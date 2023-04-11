import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const getLocation = async (id: string, res: NextApiResponse) => {
  try {
    const location = await prisma.storeDeliveryLocation.findFirst({
      where: {
        id,
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

export default getLocation
