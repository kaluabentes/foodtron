import { GetServerSidePropsContext, PreviewData } from "next"
import { getSession } from "next-auth/react"
import { ParsedUrlQuery } from "querystring"

import prisma from "@/lib/infra/prisma/client"
import { User } from "@prisma/client"

const auth = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  permissions = ["user", "admin"],
  callback?: (user: User) => any,
  redirectPath?: string
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
    include: {
      store: true,
    },
  })

  if (!user?.storeId) {
    return {
      redirect: {
        destination: "/auth/complete-signin",
        permanent: false,
      },
    }
  }

  if (!permissions.includes(user?.role!)) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  if (redirectPath) {
    return {
      redirect: {
        destination: redirectPath,
        permanent: false,
      },
    }
  }

  if (typeof callback !== "undefined") {
    return callback(user!)
  }

  return {
    props: {
      user: {
        ...user,
        emailVerified: user.emailVerified
          ? user.emailVerified?.toISOString()
          : null,
        store: {
          ...user?.store,
          minimumOrderPrice: user?.store?.minimumOrderPrice?.toFixed(2) || null,
        },
      },
    },
  }
}

export default auth
