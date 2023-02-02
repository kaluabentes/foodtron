import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"
import serverAuth from "@/middlewares/serverAuth"

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])

  if (auth.unauthorized) {
    return auth.response
  }

  if (req.method !== "PATCH") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const user = auth.user

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: req.body.name || user.name,
      },
    })

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateProfile
