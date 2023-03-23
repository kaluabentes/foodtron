import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"
import updateStore from "@/modules/admin/stores/services/updateStore"

const updateStoreHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PATCH") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const auth = await serverAuth(req, res, ["admin"])

    const updateResponse = await updateStore({
      store: auth.user.store,
      body: req.body,
    })

    return res.status(200).send(updateResponse)
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateStoreHandler
