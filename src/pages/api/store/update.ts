import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import serverAuth from "@/middlewares/serverAuth"
import addVercelSubdomain from "@/lib/infra/vercel/addVercelDomain"
import addGoDaddyRecord from "@/lib/infra/godaddy/addGoDaddyRecord"
import { Prisma } from "@prisma/client"
import deleteGoDaddyRecord from "@/lib/infra/godaddy/deleteGoDadddyRecord"
import deleteVercelSubdomain from "@/lib/infra/vercel/deleteVercelDomain"

const formatPhone = (phone: string) => phone.replace(/[\)\(\s]/g, "")

const updateStore = async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = await serverAuth(req, res, ["admin"])

  if (auth.unauthorized) {
    return auth.response
  }

  if (req.method !== "PATCH") {
    return res.status(400).send("Method not allowed")
  }

  try {
    const store = auth.user.store

    if (req.body.subdomain !== store.subdomain) {
      await deleteGoDaddyRecord(store.subdomain)
      await deleteVercelSubdomain(store.subdomain)
      await addVercelSubdomain(req.body.subdomain)
      await addGoDaddyRecord(req.body.subdomain)
    }
    console.log("whatsapp", formatPhone(req.body.whatsapp))
    await prisma.store.update({
      where: {
        id: store.id,
      },
      data: {
        name: req.body.name || store.name,
        category: req.body.category || store.category,
        logo: req.body.logo || store.logo,
        cover: req.body.cover || store.cover,
        address: req.body.address || store.address,
        whatsapp: req.body.whatsapp
          ? formatPhone(req.body.whatsapp)
          : store.whatsapp,
        facebook: req.body.facebook || store.facebook,
        instagram: req.body.instagram || store.instagram,
        subdomain: req.body.subdomain || store.subdomain,
        customDomain: req.body.customDomain || store.customDomain,
        minimumOrderPrice: req.body.minimumOrderPrice
          ? new Prisma.Decimal(req.body.minimumOrderPrice.replace(",", "."))
          : store.minimumOrderPrice,
        isOpen:
          typeof req.body.isOpen === "undefined"
            ? store.isOpen
            : req.body.isOpen,
      },
    })

    return res.status(200).send({
      status: "ok",
    })
  } catch (error: any) {
    if (error.response) {
      return res.status(400).send(error.response.data)
    }

    return res.status(400).send(error.message)
  }
}

export default updateStore
