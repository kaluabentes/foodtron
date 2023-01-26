import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteProduct from "@/modules/admin/products/controllers/deleteProduct"
import updateProduct from "@/modules/admin/products/controllers/updateProduct"

const singleProductHandler = async (
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
    return deleteProduct(String(id), res)
  }

  if (req.method === "PATCH") {
    return updateProduct(String(id), req.body, res)
  }
}

export default singleProductHandler
