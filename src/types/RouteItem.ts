import { IconType } from "react-icons"

interface RouteItem {
  icon: IconType
  label: string
  path?: string
  onClick?: () => void
}

export default RouteItem
