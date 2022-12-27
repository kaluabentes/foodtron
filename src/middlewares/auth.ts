import { GetServerSidePropsContext, PreviewData } from "next"
import { getSession } from "next-auth/react"
import { ParsedUrlQuery } from "querystring"

const auth = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
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

  return {
    props: {
      session,
    },
  }
}

export default auth
