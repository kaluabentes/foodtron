import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createSchedule from "@/modules/admin/schedules/controllers/createSchedule"

const scheduleIndexHandler = async (
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
    return createSchedule(req, res, auth.user.store.id)
  }
}

export default scheduleIndexHandler
