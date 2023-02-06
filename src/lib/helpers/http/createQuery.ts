const createQuery = (queryObject: any) =>
  `?${Object.keys(queryObject)
    .map((queryKey) => `${queryKey}=${queryObject[queryKey]}`)
    .join("&")}`

export default createQuery
