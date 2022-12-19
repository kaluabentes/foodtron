import { NextApiRequest, NextApiResponse } from "next"
import { Session, unstable_getServerSession } from "next-auth"
import * as Yup from "yup"
import { authOptions } from "./[...nextauth]"

import prisma from "@/lib/prisma"

const schema = Yup.object({
  userName: Yup.string().required(),
  storeName: Yup.string().required(),
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
        logo: "",
      },
    })

    const updateUser = await prisma.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        name: req.body.userName,
        store: {
          connect: {
            id: store.id,
          },
        },
      },
    })

    // Criar store
    console.log("updateUser", updateUser)

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    return res.status(400).send(error)
  }
}

export default completeSignin
