import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { Session, unstable_getServerSession } from "next-auth"

import prisma from "@/lib/providers/prisma/client"

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
    throw new Error("401")
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email,
    },
    include: {
      store: {
        include: {
          schedules: true,
        },
      },
    },
  })

  if (!permissions.includes(user?.role!)) {
    throw new Error("401")
  }

  return {
    user,
  }
}

export default serverAuth
