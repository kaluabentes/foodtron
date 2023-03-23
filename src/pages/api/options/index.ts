import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createOption from "@/modules/options/services/createOption"
import getOptions from "@/modules/options/services/getOptions"

const optionIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const auth = await serverAuth(req, res, ["admin"])

    if (!["GET", "POST"].includes(req.method!)) {
      return res.status(400).send("Method not allowed")
    }

    if (req.method === "POST") {
      return createOption(req, res, auth.user.store.id)
    }

    if (req.method === "GET") {
      return getOptions(res, auth.user.store.id)
    }
  } catch (error: any) {
    if (error === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default optionIndexHandler
