import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import serverAuth from "@/middlewares/serverAuth"
import { Prisma } from "@prisma/client"

const updateStore = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])

  if (auth.unauthorized) {
    return auth.response
  }

  if (req.method !== "POST") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const store = auth.user.store

    await prisma.storeDeliveryLocation.create({
      data: {
        ...req.body,
        tax: new Prisma.Decimal(req.body.tax.replace(",", ".")),
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    })

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateStore
