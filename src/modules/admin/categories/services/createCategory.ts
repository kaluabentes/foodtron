import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const createCategory = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const category = await prisma.category.create({
      data: {
        ...req.body,
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    })

    return res.status(201).send(category)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createCategory
