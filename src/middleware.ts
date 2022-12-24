import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get("host") || ""

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.cometorder.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "")

  if (hostname === "localhost:3000" || hostname === "cometorder.vercel.app") {
    return NextResponse.rewrite(url)
  }

  url.pathname = `/_sites/${currentHost}${url.pathname}`
  return NextResponse.rewrite(url)
}
