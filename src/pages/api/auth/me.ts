import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/middlewares/serverAuth"

const getUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])
  return res.send(auth.user)
}

export default getUserHandler
