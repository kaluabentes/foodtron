import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"

const getSchedules = async (res: NextApiResponse, storeId: string) => {
  try {
    const schedules = await prisma.storeSchedule.findMany({
      where: {
        storeId,
      },
    })

    return res.status(200).send(schedules)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default getSchedules
