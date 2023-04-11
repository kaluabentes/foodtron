const getCoordinates = (): Promise<{
  latitude?: number
  longitude?: number
}> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position

        resolve({
          latitude,
          longitude,
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
