import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"

import sendVerification from "@/lib/infra/sinch/sendVerification"

const ALLOWED_METHODS = ["POST"]

const sendVerificationHandler = async (
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

  if (!req.body.phone) {
    return res.status(400).send("Provide a phone key in body")
  }

  const response = await sendVerification(req.body.phone)

  return res.send(response)
}

export default sendVerificationHandler
