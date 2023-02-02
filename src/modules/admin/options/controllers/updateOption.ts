import { NextApiResponse } from "next"

import prisma from "@/lib/infra/prisma/client"
import OptionGroup from "../types/OptionGroup"
import Option from "../types/Option"
import { Prisma } from "@prisma/client"

const updateOption = async (
  id: string,
  data: OptionGroup,
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
          create: options?.map((optionChild: Option) => ({
            title: optionChild.title,
            price: new Prisma.Decimal(optionChild.price.replace(",", ".")),
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
