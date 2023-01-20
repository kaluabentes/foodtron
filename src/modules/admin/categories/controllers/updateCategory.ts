import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import Schedule from "../types/Schedule"

const updateCategory = async (
  id: string,
  data: Schedule,
  res: NextApiResponse
) => {
  try {
    const schedule = await prisma.category.update({
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

export default updateCategory
