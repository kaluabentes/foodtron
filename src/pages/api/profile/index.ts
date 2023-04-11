import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import prisma from "@/lib/providers/prisma/client"
import { User } from "@prisma/client"
import NextCors from "nextjs-cors"

const getUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (req.method !== "GET") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const user = (await jwt.verify(
      String(req.headers.authorization),
      process.env.JWT_SECRET!
    )) as User

    const userData = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      include: {
        orders: {
          include: {
            user: true,
            orderProducts: {
              include: {
                options: true,
              },
            },
          },
        },
        addresses: {
          include: {
            location: true,
          },
        },
      },
    })

    return res.status(200).send(userData)
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

export default getUserHandler
