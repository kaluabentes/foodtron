import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import jwt from "jsonwebtoken"

import sendVerification from "@/lib/infra/sinch/sendVerification"
import verifyCode from "@/lib/infra/sinch/verifyCode"
import prisma from "@/lib/infra/prisma/client"
import Address from "@/modules/app/addresses/types/Address"
import Order from "@/modules/orders/types/Order"

const ALLOWED_METHODS = ["POST"]

const verifyCodeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  })

  if (!ALLOWED_METHODS.includes(req.method!)) {
    return res.status(400).send("Method not allowed")
  }

  if (!req.body.subdomain) {
    return res.status(400).send("Provide a subdomain key in body")
  }

  if (!req.body.orders) {
    return res.status(400).send("Provide a orders key in body")
  }

  if (!req.body.addresses) {
    return res.status(400).send("Provide a addresses key in body")
  }

  if (!req.body.phone) {
    return res.status(400).send("Provide a phone key in body")
  }

  if (!req.body.code) {
    return res.status(400).send("Provide a code key in body")
  }

  try {
    const response = await verifyCode(req.body.phone, req.body.code)

    if (response.data.status === "SUCCESSFUL") {
      const store = await prisma.store.findFirst({
        where: {
          subdomain: req.body.subdomain,
        },
      })

      const include = {
        orders: {
          include: {
            user: true,
            orderProducts: {
              include: {
                options: true,
              },
            },
          },
        },
        addresses: {
          include: {
            location: true,
          },
        },
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          storeId: store?.id,
          phone: req.body.phone,
        },
        include,
      })

      if (existingUser) {
        const token = await jwt.sign(existingUser, process.env.JWT_SECRET!)

        const user = await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            orders: {
              connect: req.body.orders.map((order: Order) => ({
                id: order.id,
              })),
            },
            addresses: {
              create: req.body.addresses.map((address: Address) => ({
                street: address.street,
                number: address.number,
                location: {
                  connect: {
                    id: address.location.id,
                  },
                },
              })),
            },
          },
          include,
        })
        console.log("chegou aqui")
        return res.send({
          token,
          user,
        })
      }

      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          phone: req.body.phone,
          store: {
            connect: {
              id: store?.id,
            },
          },
          orders: {
            connect: req.body.orders.map((order: Order) => ({
              id: order.id,
            })),
          },
          addresses: {
            create: req.body.addresses.map((address: Address) => ({
              street: address.street,
              number: address.number,
              location: {
                connect: {
                  id: address.location.id,
                },
              },
            })),
          },
        },
        include,
      })

      const token = await jwt.sign(user, process.env.JWT_SECRET!)

      return res.send({
        token,
        user,
      })
    }

    return res.send(response.data)
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

export default verifyCodeHandler
