import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"

const deleteOption = async (id: string, res: NextApiResponse) => {
  try {
    const product = await prisma.optionGroup.delete({
      where: {
        id: String(id),
      },
    })

    return res.status(200).send(product)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default deleteOption
