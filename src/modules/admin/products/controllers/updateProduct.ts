import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma"
import Product from "../types/Product"
import { Prisma } from "@prisma/client"
import OptionGroup from "../../options/types/OptionGroup"

const updateProduct = async (id: string, data: any, res: NextApiResponse) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        price: new Prisma.Decimal(data.price.replace(",", ".")),
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
      include: {
        productOptionGroups: true,
      },
    })

    const toDeleteProductOptionGroups = product.productOptionGroups.filter(
      (productOptGroup) =>
        data.disconnectOptionGroups.find(
          (opt: OptionGroup) => opt.id === productOptGroup.optionGroupId
        )
    )

    await prisma.productOptionGroup.deleteMany({
      where: {
        id: {
          in: toDeleteProductOptionGroups.map((opt) => opt.id),
        },
      },
    })

    const optionGroupIds = product.productOptionGroups.map(
      (optGroup) => optGroup.optionGroupId
    )
    const toCreateProductOptionGroups = data.optionGroups.filter(
      (optGroup: OptionGroup) => !optionGroupIds.includes(optGroup.id!)
    )

    const newProduct = await prisma.product.update({
      where: {
        id: String(id),
      },
      data: {
        productOptionGroups: {
          create: toCreateProductOptionGroups.map(
            (optionGroup: OptionGroup) => ({
              optionGroupId: optionGroup.id,
            })
          ),
        },
      },
    })

    return res.status(200).send(newProduct)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default updateProduct
