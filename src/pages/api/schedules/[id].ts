import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteSchedule from "@/modules/schedules/controllers/deleteSchedule"
import updateSchedule from "@/modules/schedules/controllers/updateSchedule"

const singleScheduleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])
  const { id } = req.query

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["PATCH", "DELETE", "GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "DELETE") {
    return deleteSchedule(String(id), res)
  }

  if (req.method === "PATCH") {
    return updateSchedule(String(id), req.body, res)
  }
}

export default singleScheduleHandler
