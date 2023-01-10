import { GetServerSidePropsContext, PreviewData } from "next"
import { getSession } from "next-auth/react"
import { ParsedUrlQuery } from "querystring"

const auth = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  permissions = ["user", "admin"]
) => {
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

  if (!permissions.includes(user?.role!)) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session: {
        user,
      },
    },
  }
}

export default auth
