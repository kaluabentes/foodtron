import { NextApiRequest, NextApiResponse } from "next"
import { Session, unstable_getServerSession } from "next-auth"
import * as Yup from "yup"
import { authOptions } from "./[...nextauth]"

import prisma from "@/lib/infra/prisma/client"
import addGoDaddyRecord from "@/lib/infra/godaddy/addGoDaddyRecord"
import addVercelSubdomain from "@/lib/infra/vercel/addVercelDomain"

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

    await addVercelSubdomain(req.body.subdomain)
    await addGoDaddyRecord(req.body.subdomain)

    const store = await prisma.store.create({
      data: {
        name: req.body.storeName,
        subdomain: req.body.subdomain,
        logo: req.body.logo,
        cover: req.body.cover,
      },
    })

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
