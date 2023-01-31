const range = (num: number) =>
  Array(num)
    .fill(null)
    .map((_, index) => index + 1)

export default range
