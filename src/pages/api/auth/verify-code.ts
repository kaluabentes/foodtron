import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import jwt from "jsonwebtoken"

import verifyCode from "@/lib/providers/sinch/verifyCode"
import prisma from "@/lib/providers/prisma/client"
import Address from "@/modules/app/addresses/types/Address"
import Order from "@/modules/admin/orders/types/Order"
import createOrUpdateUser from "@/modules/app/auth/services/createOrUpdateUser"

const ALLOWED_METHODS = ["POST"]

const verifyCodeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ALLOWED_METHODS,
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!ALLOWED_METHODS.includes(req.method!)) {
    return res.status(400).send(`Method not allowed`)
  }

  if (!req.body.subdomain) {
    return res.status(400).send("Provide a subdomain key in body")
  }

  if (!req.body.orders) {
    return res.status(400).send("Provide a orders key in body")
  }

  if (!req.body.addresses) {
    return res.status(400).send("Provide a addresses key in body")
  }

  if (!req.body.phone) {
    return res.status(400).send("Provide a phone key in body")
  }

  if (!req.body.code) {
    return res.status(400).send("Provide a code key in body")
  }

  try {
    const response = await verifyCode(req.body.phone, req.body.code)

    if (response.data.status === "SUCCESSFUL") {
      const user = await createOrUpdateUser(req.body)
      const token = await jwt.sign(user, process.env.JWT_SECRET!)

      return res.send({
        token,
        user,
      })
    }

    return res.send(response.data)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default verifyCodeHandler
