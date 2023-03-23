import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteProduct from "@/modules/products/services/deleteProduct"
import updateProduct from "@/modules/products/services/updateProduct"

const singleProductHandler = async (
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
      return deleteProduct(String(id), res)
    }

    if (req.method === "PATCH") {
      return updateProduct(String(id), req.body, res)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default singleProductHandler
