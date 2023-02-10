import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"
import { OptionGroup, Prisma } from "@prisma/client"

interface Option {
  title: string
  price: string
}

interface OptionGroupData extends OptionGroup {
  options: Option[]
}

const updateOption = async (
  id: string,
  data: OptionGroupData,
  res: NextApiResponse
) => {
  try {
    const { options } = data

    await prisma.option.deleteMany({
      where: {
        optionGroupId: String(id),
      },
    })

    const option = await prisma.optionGroup.update({
      where: {
        id: String(id),
      },
      data: {
        ...data,
        options: {
          create: options.map((optionChild: Option) => ({
            title: optionChild.title,
            price: optionChild.price
              ? new Prisma.Decimal(optionChild.price.replace(",", "."))
              : null,
          })),
        },
      },
    })

    return res.status(200).send(option)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export default updateOption
