import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import getStore from "@/modules/stores/services/getStore"

const storeIndexHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    await serverAuth(req, res, ["admin"])

    const { id } = req.query

    if (req.method === "GET") {
      const store = await getStore({ storeId: String(id) })
      return res.status(200).send(store)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default storeIndexHandler
