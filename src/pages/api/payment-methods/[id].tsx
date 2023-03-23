import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deletePaymentMethod from "@/modules/admin/payment-methods/services/deletePaymentMethod"
import updatePaymentMethod from "@/modules/admin/payment-methods/services/updatePaymentMethod"

const paymentMethodsIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!["PATCH", "DELETE"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    await serverAuth(req, res, ["admin"])

    const { id } = req.query

    if (req.method === "DELETE") {
      return deletePaymentMethod(res, String(id))
    }

    if (req.method === "PATCH") {
      return updatePaymentMethod(res, String(id), req.body)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default paymentMethodsIndexHandler
