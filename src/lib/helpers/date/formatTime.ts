const formatTime = (isoString: string) => {
  const date = new Date(Date.parse(isoString))
  const padZero = (number: number) => String(number).padStart(2, "0")

  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`
}

export default formatTime
