import { Prisma } from "@prisma/client"

import formatPhone from "@/lib/helpers/string/formatPhone"
import addGoDaddyRecord from "@/lib/infra/godaddy/addGoDaddyRecord"
import deleteGoDaddyRecord from "@/lib/infra/godaddy/deleteGoDadddyRecord"
import addVercelSubdomain from "@/lib/infra/vercel/addVercelDomain"
import deleteVercelSubdomain from "@/lib/infra/vercel/deleteVercelDomain"
import prisma from "@/lib/infra/prisma/client"

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
      name: body.name || store.name,
      logo: body.logo || store.logo,
      cover: body.cover || store.cover,
      address: body.address || store.address,
      whatsapp: body.whatsapp ? formatPhone(body.whatsapp) : store.whatsapp,
      subdomain: body.subdomain || store.subdomain,
      customDomain: body.customDomain || store.customDomain,
      minimumOrderPrice: body.minimumOrderPrice
        ? new Prisma.Decimal(body.minimumOrderPrice.replace(",", "."))
        : store.minimumOrderPrice,
      isOpen: typeof body.isOpen === "undefined" ? store.isOpen : body.isOpen,
    },
  })

  return updateResponse
}

export default updateStore
