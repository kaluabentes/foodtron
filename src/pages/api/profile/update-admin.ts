import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"
import serverAuth from "@/middlewares/serverAuth"

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const auth = await serverAuth(req, res, ["admin"])
    const user = auth.user

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: req.body,
    })

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    if (error.message === "401") {
      return res.status(401).send("Unauthorized")
    }

    if (error.response) {
      return res.status(500).send(error.response.data)
    }

    return res.status(500).send(error.message)
  }
}

export default updateProfile
