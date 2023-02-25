import { Prisma } from "@prisma/client"

const createDecimal = (number: string) =>
  new Prisma.Decimal(number.replace(",", "."))

export default createDecimal
