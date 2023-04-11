import { NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"
import Schedule from "../types/Schedule"

const updateSchedule = async (
  id: string,
  data: Schedule,
  res: NextApiResponse
) => {
  try {
    const schedule = await prisma.storeSchedule.update({
      where: {
        id: String(id),
      },
      data,
    })

    return res.status(200).send(schedule)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default updateSchedule
