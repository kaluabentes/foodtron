import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"

import createOrder from "@/modules/admin/orders/services/createOrder"
import serverAuth from "@/middlewares/serverAuth"
import getOrders from "@/modules/admin/orders/services/getOrders"
import createChannel from "@/lib/infra/ably/createChannel"
import getOrdersById from "@/modules/admin/orders/services/getOrdersById"
import sendSMS from "@/lib/infra/sinch/sendSMS"

const ROOT_URL = process.env.NEXTAUTH_URL

const indexOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
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

      await sendSMS(
        order.store.whatsapp!,
        `Você recebeu um novo pedido, confira em: ${ROOT_URL}/admin/orders?id=${order.id}`
      )

      return res.status(200).send(order)
    }

    if (req.method === "GET" && req.query.ids) {
      return res
        .status(200)
        .send(await getOrdersById(String(req.query.ids).split(",")))
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
