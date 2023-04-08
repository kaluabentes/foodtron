import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

const rewriteUrls = (req: NextRequest) => {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${APEX_DOMAIN}`, "")
      : hostname.replace(`.localhost:3000`, "")

  if (hostname === "localhost:3000" || hostname === APEX_DOMAIN) {
    return NextResponse.rewrite(url)
  }

  url.pathname = `/app/${currentHost}${url.pathname}`
  return NextResponse.rewrite(url)
}

export default rewriteUrls
