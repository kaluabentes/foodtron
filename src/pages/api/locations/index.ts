import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"
import serverAuth from "@/middlewares/serverAuth"
import getLocations from "@/modules/locations/controllers/getLocations"
import createLocation from "@/modules/locations/controllers/createLocation"

const locationsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])
  const storeId = auth.user.store.id

  if (auth.unauthorized) {
    return auth.response
  }

  if (!["GET", "POST"].includes(req.method!)) {
    return res.status(405).send("Method not allowed")
  }

  if (req.method === "GET") {
    return getLocations(String(storeId), res)
  }

  if (req.method === "POST") {
    return createLocation(req, res, String(storeId))
  }
}

export default locationsHandler
