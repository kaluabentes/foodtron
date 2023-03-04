import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"
import NextCors from "nextjs-cors"

import createOrder from "@/modules/orders/controllers/createOrder"
import runMiddleware from "@/lib/infra/next/runMiddleware"
import serverAuth from "@/middlewares/serverAuth"
import getOrders from "@/modules/orders/controllers/getOrders"
import prisma from "@/lib/infra/prisma/client"
import createChannel from "@/lib/infra/ably/createChannel"

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

const indexOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!["POST", "GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    if (req.method === "POST") {
      const order = await createOrder(req.body)

      const channel = await createChannel(order.store.subdomain!, "server")
      await channel.publish("newOrder", order)

      return res.status(200).send(order)
    }

    if (req.method === "GET") {
      const auth = await serverAuth(req, res, ["admin"])
      const storeId = auth.user.store.id
      const orders = await getOrders(storeId, Boolean(req.query.isArchive))
      return res.status(200).send(orders)
    }
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default indexOrderHandler
