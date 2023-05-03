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
  {
    name: "Visa",
    type: "visa",
  },
  {
    name: "Mastercard",
    type: "mastercard",
  },
  {
    name: "American Express",
    type: "americanExpress",
  },
  {
    name: "Diners Club",
    type: "dinersClub",
  },
  {
    name: "Transferência Bancária",
    type: "bankTransfer",
  },
  {
    name: "Picpay",
    type: "picpay",
  },
  {
    name: "Alelo Refeição",
    type: "aleloRefeicao",
  },
  {
    name: "Ame Digital",
    type: "ameDigital",
  },
  {
    name: "Bem Visa Vale",
    type: "bemVisaVale",
  },
  {
    name: "Sodexo Alimentação",
    type: "sodexoAlimentacao",
  },
  {
    name: "Sodexo Refeição",
    type: "sodexoRefeicao",
  },
  {
    name: "Vale Card",
    type: "valeCard",
  },
  {
    name: "VR Alimentação",
    type: "vrAlimentacao",
  },
  {
    name: "VR Refeição",
    type: "vrRefeicao",
  },
  {
    name: "Bitcoin",
    type: "bitcoin",
  },
  {
    name: "Elo",
    type: "elo",
  },
  {
    name: "Vale Alimentação",
    type: "valeAlimentacao",
  },
]
