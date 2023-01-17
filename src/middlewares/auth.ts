import { GetServerSidePropsContext, PreviewData } from "next"
import { getSession } from "next-auth/react"
import { ParsedUrlQuery } from "querystring"

import prisma from "@/lib/infra/prisma"
import { User } from "@prisma/client"

const auth = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  permissions = ["user", "admin"],
  callback?: (user: User) => any
): Promise<any> => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email,
    },
  })

  if (!permissions.includes(user?.role!)) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  if (typeof callback !== "undefined") {
    return callback(user!)
  }

  return {
    props: {
      user,
    },
  }
}

export default auth
