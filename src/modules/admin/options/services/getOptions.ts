import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const getOptions = async (res: NextApiResponse, storeId: string) => {
  try {
    const products = await prisma.optionGroup.findMany({
      where: {
        storeId,
      },
      include: {
        options: true,
      },
    })

    return res.status(200).send(products)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default getOptions
