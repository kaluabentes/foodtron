import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import prisma from "@/lib/infra/prisma/client"
import { User } from "@prisma/client"
import NextCors from "nextjs-cors"
import getAddresses from "@/modules/app/addresses/services/getAddresses"

const ALLOWED_METHODS = ["POST", "GET"]

const addressesIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!ALLOWED_METHODS.includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    const user = (await jwt.verify(
      String(req.headers.authorization),
      process.env.JWT_SECRET!
    )) as User

    if (req.method === "GET") {
      return res.status(200).send(await getAddresses(user.id))
    }

    const address = await prisma.address.create({
      data: {
        street: req.body.street,
        number: req.body.number,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        location: {
          connect: {
            id: req.body.location.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        location: true,
      },
    })

    return res.status(200).send(address)
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

export default addressesIndexHandler
