import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"

const deleteSchedule = async (id: string, res: NextApiResponse) => {
  try {
    const schedule = await prisma.storeSchedule.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(200).send(schedule)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default deleteSchedule
