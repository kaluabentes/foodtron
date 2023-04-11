import prisma from "@/lib/providers/prisma/client"

const getProductsByDomain = async (domain: string) => {
  const store = await prisma.store.findFirst({
    where: {
      subdomain: domain,
    },
    include: {
      products: {
        include: {
          productOptionGroups: {
            include: {
              optionGroup: {
                include: {
                  options: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return store?.products
}

export default getProductsByDomain
