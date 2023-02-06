import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import deleteSchedule from "@/modules/schedules/controllers/deleteSchedule"
import updateSchedule from "@/modules/schedules/controllers/updateSchedule"

const singleScheduleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!["PATCH", "DELETE", "GET"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    await serverAuth(req, res, ["admin"])

    const { id } = req.query

    if (req.method === "DELETE") {
      return deleteSchedule(String(id), res)
    }

    if (req.method === "PATCH") {
      return updateSchedule(String(id), req.body, res)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default singleScheduleHandler
