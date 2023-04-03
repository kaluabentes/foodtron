const handleKeyDown = (onClick: () => void) => (event: any) => {
  event.preventDefault()

  if (event.key === "Enter" || event.key === " ") {
    onClick()
  }
}

export default handleKeyDown
