import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { Session, unstable_getServerSession } from "next-auth"

import prisma from "@/lib/infra/prisma"
import { User } from "@prisma/client"

interface ServerAuthResponse {
  unauthorized?: boolean
  response?: any
  user?: any
}

const serverAuth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  permissions = ["user", "admin"]
): Promise<ServerAuthResponse> => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  )) as Session

  if (!session) {
    return {
      unauthorized: true,
      response: res.status(401).send("Unauthorized"),
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email,
    },
    include: {
      store: true,
    },
  })

  if (!permissions.includes(user?.role!)) {
    return {
      unauthorized: true,
      response: res.status(401).send("Unauthorized"),
    }
  }

  return {
    user,
  }
}

export default serverAuth
