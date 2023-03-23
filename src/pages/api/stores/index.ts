import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

import getStore from "@/modules/stores/services/getStore"
import runMiddleware from "@/lib/infra/next/runMiddleware"

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

const storeIndexHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)

  const { domain } = req.query

  if (!["GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const store = await getStore({ domain: String(domain) })
    return res.status(200).send(store)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default storeIndexHandler
