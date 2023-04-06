const filterNumber = (value: string) =>
  value.replace(/([!@#$%¨&*+\-/_()={}\[\]~\\^`´:;?°º<>"'|A-Z])/gi, "")

export default filterNumber
