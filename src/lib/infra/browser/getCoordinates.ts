const getCoordinates = (): Promise<{
  latitude?: string
  longitude?: string
}> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position

        resolve({
          latitude: String(latitude),
          longitude: String(longitude),
        })
      },
      () => {
        resolve({
          latitude: undefined,
          longitude: undefined,
        })
      }
    )
  })
}

export default getCoordinates
