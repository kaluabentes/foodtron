import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteOption from "@/modules/options/controllers/deleteOption"
import updateOption from "@/modules/options/controllers/updateOption"

const singleOptionHandler = async (
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
    return deleteOption(String(id), res)
  }

  if (req.method === "PATCH") {
    return updateOption(String(id), req.body, res)
  }
}

export default singleOptionHandler
