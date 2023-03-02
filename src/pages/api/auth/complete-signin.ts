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

    const schedules = Array(7)
      .fill(null)
      .map((_, index) => ({
        weekDay: String(index),
        start: "08:00",
        end: "23:00",
        isScheduledClosing: false,
        isEnabled: true,
      }))

    const store = await prisma.store.create({
      data: {
        name: req.body.storeName,
        subdomain: req.body.subdomain,
        logo: req.body.logo,
        cover: req.body.cover,
        schedules: {
          create: schedules,
        },
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
    return res.status(400).send(error.message)
  }
}

export default completeSignin
