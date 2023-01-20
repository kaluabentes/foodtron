import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"

const deleteCategory = async (id: string, res: NextApiResponse) => {
  try {
    const schedule = await prisma.category.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(200).send(schedule)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default deleteCategory
