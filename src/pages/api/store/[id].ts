import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createSchedule from "@/modules/schedules/controllers/createSchedule"
import getSchedules from "@/modules/schedules/controllers/getSchedules"
import getStore from "@/modules/store/controllers/getStore"

const storeIndexHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])
  const { id } = req.query

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "GET") {
    return getStore(res, String(id))
  }
}

export default storeIndexHandler
