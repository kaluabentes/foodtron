const isNaN = (text: string) => String(Number(text.replace(",", "."))) === "NaN"

export default isNaN
