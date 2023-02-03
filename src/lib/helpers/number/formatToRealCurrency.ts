const formatToRealCurrency = (number: number) =>
  `R$ ${number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export default formatToRealCurrency
