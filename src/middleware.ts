import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import rewriteUrls from "@/middlewares/rewriteUrls"

export const config = {
  matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
}

export function middleware(req: NextRequest) {
  // if (req.nextUrl.pathname.startsWith("/auth")) {
  //   return auth(req)
  // }

  return rewriteUrls(req)
}
