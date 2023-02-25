import { NextApiRequest, NextApiResponse } from "next"

import getOrder from "@/modules/orders/controllers/getOrder"

const singleOrderHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!["PATCH", "DELETE", "GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const { id } = req.query

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
