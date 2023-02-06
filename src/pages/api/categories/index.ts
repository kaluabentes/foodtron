import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createCategory from "@/modules/categories/controllers/createCategory"
import getCategories from "@/modules/categories/controllers/getCategories"

const scheduleIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])

  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "POST") {
    return createCategory(req, res, auth.user.store.id)
  }

  if (req.method === "GET") {
    return getCategories(res, auth.user.store.id)
  }
}

export default scheduleIndexHandler
