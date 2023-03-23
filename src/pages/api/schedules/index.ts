import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import createSchedule from "@/modules/admin/schedules/services/createSchedule"
import getSchedules from "@/modules/admin/schedules/services/getSchedules"

const scheduleIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const auth = await serverAuth(req, res, ["admin"])

    if (req.method === "POST") {
      return createSchedule(req, res, auth.user.store.id)
    }

    if (req.method === "GET") {
      return getSchedules(res, auth.user.store.id)
    }
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    return res.status(500).send(error.message)
  }
}

export default scheduleIndexHandler
