import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createPaymentMethod from "@/modules/payment-methods/controllers/createPaymentMethod"
import getPaymentMethods from "@/modules/payment-methods/controllers/getPaymentMethods"

const paymentMethodsIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])
  const storeId = auth.user.store.id

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "POST") {
    return createPaymentMethod(req, res, storeId)
  }

  if (req.method === "GET") {
    return getPaymentMethods(res, storeId)
  }
}

export default paymentMethodsIndexHandler
