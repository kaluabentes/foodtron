import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/providers/prisma/client"
import serverAuth from "@/middlewares/serverAuth"
import getLocations from "@/modules/admin/locations/services/getLocations"
import createLocation from "@/modules/admin/locations/services/createLocation"

const locationsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])
  const storeId = auth.user.store.id

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
