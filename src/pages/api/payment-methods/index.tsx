import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createPaymentMethod from "@/modules/payment-methods/controllers/createPaymentMethod"
import getPaymentMethods from "@/modules/payment-methods/controllers/getPaymentMethods"

const paymentMethodsIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const auth = await serverAuth(req, res, ["admin"])
    const storeId = auth.user.store.id

    if (req.method === "POST") {
      return createPaymentMethod(req, res, storeId)
    }

    if (req.method === "GET") {
      return getPaymentMethods(res, storeId)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default paymentMethodsIndexHandler
