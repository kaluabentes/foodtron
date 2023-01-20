import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteCategory from "@/modules/admin/categories/controllers/deleteCategory"
import updateCategory from "@/modules/admin/categories/controllers/updateCategory"

const singleScheduleHandler = async (
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
    return deleteCategory(String(id), res)
  }

  if (req.method === "PATCH") {
    return updateCategory(String(id), req.body, res)
  }
}

export default singleScheduleHandler
