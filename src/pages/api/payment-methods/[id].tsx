import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deletePaymentMethod from "@/modules/admin/payment-methods/controllers/deletePaymentMethod"
import updatePaymentMethod from "@/modules/admin/payment-methods/controllers/updatePaymentMethod"

const paymentMethodsIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])
  const { id } = req.query

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["PATCH", "DELETE"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "DELETE") {
    return deletePaymentMethod(res, String(id))
  }

  if (req.method === "PATCH") {
    return updatePaymentMethod(res, String(id), req.body)
  }
}

export default paymentMethodsIndexHandler
