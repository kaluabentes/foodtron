import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import prisma from "@/lib/infra/prisma/client"
import NextCors from "nextjs-cors"
import { ORDER_STATUS } from "@/modules/admin/orders/constants"

const ALLOWED_METHODS = ["PATCH"]

const cancelOrderHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!ALLOWED_METHODS.includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const { orderId } = req.body

    if (req.method === "PATCH") {
      const order = await prisma.order.update({
        where: {
          id: String(orderId),
        },
        data: {
          status: ORDER_STATUS.CANCELLED,
          reasonForCancellation: "Cancelado pelo usuário.",
        },
      })

      return res.status(200).send(order)
    }
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default cancelOrderHandler
