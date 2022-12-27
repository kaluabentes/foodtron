import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const rewriteUrls = (req: NextRequest) => {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "")

  if (hostname === "localhost:3000" || hostname === "cometorder.vercel.app") {
    return NextResponse.rewrite(url)
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`
  return NextResponse.rewrite(url)
}

export default rewriteUrls
