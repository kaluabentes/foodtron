import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import serverAuth from "@/middlewares/serverAuth"
import getLocation from "@/modules/admin/locations/controllers/getLocation"
import updateLocation from "@/modules/admin/locations/controllers/updateLocation"
import deleteLocation from "@/modules/admin/locations/controllers/deleteLocation"

const getLocationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const auth = await serverAuth(req, res, ["admin"])
  const { id } = req.query

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["GET", "PATCH", "DELETE"].includes(String(req.method))) {
    return res.status(400).send("Method not allowed")
  }

  if (req.method === "DELETE") {
    return deleteLocation(String(id), res)
  }

  if (req.method === "GET") {
    return getLocation(String(id), res)
  }

  if (req.method === "PATCH") {
    return updateLocation(String(id), req.body, res)
  }
}

export default getLocationHandler
