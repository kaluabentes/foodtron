import { NextApiRequest, NextApiResponse } from "next"

import getOrder from "@/modules/admin/orders/services/getOrder"
import updateOrder from "@/modules/admin/orders/services/updateOrder"
import serverAuth from "@/middlewares/serverAuth"
import NextCors from "nextjs-cors"

const singleOrderHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!["PATCH", "DELETE", "GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const { id } = req.query

    if (req.method === "PATCH") {
      await serverAuth(req, res, ["admin"])
      const order = await updateOrder(String(id), req.body)
      return res.status(200).send(order)
    }

    if (req.method === "GET") {
      const order = await getOrder(String(id))
      return res.status(200).send(order)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default singleOrderHandler
