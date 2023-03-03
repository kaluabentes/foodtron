const formatDate = (isoString: string, todayString = false) => {
  const date = new Date(Date.parse(isoString))
  const today = new Date()

  const padZero = (number: number) => String(number).padStart(2, "0")
  const datePart = `${padZero(date.getDate())}/${padZero(
    date.getMonth() + 1
  )}/${padZero(date.getFullYear()).substring(2, 4)}`

  return `${
    today.getDate() === date.getDate() && todayString ? "Hoje" : datePart
  } ás ${padZero(date.getHours())}:${padZero(date.getMinutes())}`
}

export default formatDate
