import { BooleanSchema, DateSchemaConstructor } from "yup"

declare module "yup" {
  interface BooleanSchema {
    terms(value: string): DateSchema
  }
}

export const date: DateSchemaConstructor
