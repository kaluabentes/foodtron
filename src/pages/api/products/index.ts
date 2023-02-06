import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

import serverAuth from "@/middlewares/serverAuth"
import createProduct from "@/modules/products/controllers/createProduct"
import getProducts from "@/modules/products/controllers/getProducts"
import getProductsByDomain from "@/modules/products/controllers/getProductsByDomain"
import runMiddleware from "@/lib/infra/next/runMiddleware"

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

const productIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await runMiddleware(req, res, cors)

  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const { domain } = req.query

    if (domain) {
      const products = await getProductsByDomain(String(domain))
      return res.status(200).send(products)
    }

    const auth = await serverAuth(req, res, ["admin"])

    if (req.method === "POST") {
      return createProduct(req, res, auth.user.store.id)
    }

    if (req.method === "GET") {
      return getProducts(res, auth.user.store.id)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default productIndexHandler
