const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3")
  return audio.play()
}

export default playNotificationSound
