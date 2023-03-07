import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import sendVerificationRequest from "@/lib/infra/nextAuth/sendVerificationRequest"

import prisma from "@/lib/infra/prisma/client"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    verifyRequest: "/auth/verify-request",
    signIn: "/auth/signin",
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.endsWith("edit-user")) {
        const [, baseDomain] = baseUrl.split("//")
        if (url.includes(baseDomain)) {
          return Promise.resolve(url)
        }
      }

      return Promise.resolve(baseUrl)
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain:
          process.env.NODE_ENV === "production"
            ? ".gocomet.app"
            : ".localhost:3000",
        secure: process.env.NODE_ENV === "production" ? true : false,
      },
    },
  },
}

export default NextAuth(authOptions)
