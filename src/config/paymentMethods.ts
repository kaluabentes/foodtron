export interface PaymentMethod {
  name: string
  type: string
}

export default [
  {
    name: "Dinheiro",
    type: "cash",
  },
  {
    name: "Pix",
    type: "pix",
  },
  {
    name: "Cartão de crédito",
    type: "creditCard",
  },
  {
    name: "Cartão de débito",
    type: "debitCard",
  },
]
