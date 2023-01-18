import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import serverAuth from "@/middlewares/serverAuth"

const updateStore = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])
  const { storeId } = req.query

  if (auth.unauthorized) {
    return auth.response
  }

  if (req.method !== "GET") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const locations = await prisma.storeDeliveryLocation.findMany({
      where: {
        storeId: String(storeId),
      },
    })

    return res.status(200).send(locations)
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateStore
