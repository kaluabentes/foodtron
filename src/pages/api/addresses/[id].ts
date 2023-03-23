import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

import prisma from "@/lib/infra/prisma/client"
import serverAuth from "@/middlewares/serverAuth"
import { User } from "@prisma/client"
import NextCors from "nextjs-cors"
import updateAddress from "@/modules/addresses/services/updateAddress"
import deleteAddress from "@/modules/app/addresses/services/deleteAddress"

const ALLOWED_METHODS = ["PATCH", "DELETE"]

const singleAddressHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!ALLOWED_METHODS.includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  try {
    await jwt.verify(String(req.headers.authorization), process.env.JWT_SECRET!)

    if (req.method === "PATCH") {
      const address = await updateAddress(String(req.query.id), req.body)

      return res.status(200).send(address)
    }

    if (req.method === "DELETE") {
      const deleteResponse = await deleteAddress(String(req.query.id))
      return res.status(200).send(deleteResponse)
    }
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

export default singleAddressHandler
