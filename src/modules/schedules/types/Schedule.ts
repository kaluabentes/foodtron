interface Schedule {
  id: string
  weekDay: string
  start: string
  end: string
  isScheduledClosing?: boolean
  isEnabled?: boolean
}

export default Schedule
