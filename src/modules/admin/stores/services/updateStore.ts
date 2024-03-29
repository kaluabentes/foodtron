import { Prisma } from "@prisma/client"

import formatPhone from "@/lib/helpers/string/formatPhone"
import addGoDaddyRecord from "@/lib/providers/godaddy/addGoDaddyRecord"
import deleteGoDaddyRecord from "@/lib/providers/godaddy/deleteGoDadddyRecord"
import addVercelSubdomain from "@/lib/providers/vercel/addVercelDomain"
import deleteVercelSubdomain from "@/lib/providers/vercel/deleteVercelDomain"
import prisma from "@/lib/providers/prisma/client"

const updateStore = async ({ store, body }: any) => {
  if (
    typeof body.subdomain !== "undefined" &&
    body.subdomain !== store.subdomain
  ) {
    await deleteGoDaddyRecord(store.subdomain)
    await deleteVercelSubdomain(store.subdomain)
    await addVercelSubdomain(body.subdomain)
    await addGoDaddyRecord(body.subdomain)
  }

  const updateResponse = await prisma.store.update({
    where: {
      id: store.id,
    },
    data: {
      ...body,
      whatsapp: body.whatsapp ? formatPhone(body.whatsapp) : store.whatsapp,
      minimumOrderPrice: body.minimumOrderPrice
        ? new Prisma.Decimal(body.minimumOrderPrice.replace(",", "."))
        : store.minimumOrderPrice,
      isOpen: typeof body.isOpen === "undefined" ? store.isOpen : body.isOpen,
    },
  })

  return updateResponse
}

export default updateStore
