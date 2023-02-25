import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

import createOrder from "@/modules/orders/controllers/createOrder"
import runMiddleware from "@/lib/infra/next/runMiddleware"

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

const indexOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)

  if (!["POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    if (req.method === "POST") {
      const order = await createOrder(req.body)
      return res.status(200).send(order)
    }
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default indexOrderHandler
