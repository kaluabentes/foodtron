import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"

const createSchedule = async (
  req: NextApiRequest,
  res: NextApiResponse,
  storeId: string
) => {
  try {
    const schedule = await prisma.storeSchedule.create({
      data: {
        ...req.body,
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    })

    return res.status(201).send(schedule)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default createSchedule
