import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createOption from "@/modules/admin/options/controllers/createOption"
import getOptions from "@/modules/admin/options/controllers/getOptions"

const optionIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "POST") {
    return createOption(req, res, auth.user.store.id)
  }

  if (req.method === "GET") {
    return getOptions(res, auth.user.store.id)
  }
}

export default optionIndexHandler
