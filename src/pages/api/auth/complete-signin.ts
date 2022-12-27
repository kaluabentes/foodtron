import { NextApiRequest, NextApiResponse } from "next"
import { Session, unstable_getServerSession } from "next-auth"
import * as Yup from "yup"
import { authOptions } from "./[...nextauth]"

import prisma from "@/lib/prisma"
import axios from "axios"

const PROJECT_ID = process.env.PROJECT_ID_VERCEL!
const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN!
const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

const schema = Yup.object({
  userName: Yup.string().required(),
  storeName: Yup.string().required(),
  subdomain: Yup.string().required(),
})

const completeSignin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session

  if (!session) {
    return res.status(401).send("Unauthorized")
  }

  try {
    await schema.validate(req.body)

    const store = await prisma.store.create({
      data: {
        name: req.body.storeName,
        subdomain: req.body.subdomain,
      },
    })

    const domainName = `${req.body.subdomain}.${APEX_DOMAIN}`
    const domainApiUrl = `https://api.vercel.com/projects/${PROJECT_ID}/domains`
    await axios.post(
      domainApiUrl,
      {
        name: domainName,
      },
      {
        headers: {
          Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
        },
      }
    )

    await prisma.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        name: req.body.userName,
        role: "admin",
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    })

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error)
  }
}

export default completeSignin
