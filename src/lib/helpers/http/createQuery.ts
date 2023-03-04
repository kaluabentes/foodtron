const createQuery = (queryObject: any, url?: string) =>
  `?${Object.keys(queryObject)
    .map((queryKey) => `${queryKey}=${queryObject[queryKey]}`)
    .join("&")}`

export default createQuery
