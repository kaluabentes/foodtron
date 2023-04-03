const match = (search: string, value: string) => {
  const regex = new RegExp(search, "i")

  return Boolean(regex.exec(value))
}

export default match
