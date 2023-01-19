import { signOut } from "next-auth/react"
import { IconType } from "react-icons"
import {
  BiUser,
  BiCollection,
  BiGridAlt,
  BiLogOut,
  BiMap,
  BiHomeHeart,
  BiAlarm,
  BiMoney,
} from "react-icons/bi"

interface RouteItem {
  icon: IconType
  label: string
  path: string
  onClick?: () => void
}

export const topMenu: RouteItem[] = [
  {
    icon: BiCollection,
    label: "Pedidos",
    path: "/admin/orders",
  },
  {
    icon: BiGridAlt,
    label: "Produtos",
    path: "/admin/products",
  },
  {
    icon: BiMoney,
    label: "Pagamento",
    path: "/admin/payment-methods",
  },
  {
    icon: BiMap,
    label: "Locais",
    path: "/admin/locations",
  },
  {
    icon: BiAlarm,
    label: "Horários",
    path: "/admin/schedules",
  },
]

export const bottomMenu: RouteItem[] = [
  {
    icon: BiHomeHeart,
    label: "Loja",
    path: "/admin/store",
  },
  {
    icon: BiUser,
    label: "Perfil",
    path: "/admin/profile",
  },
  {
    icon: BiLogOut,
    label: "Sair",
    path: "/admin/logout",
    onClick: () => signOut({ callbackUrl: "/auth/signin" }),
  },
]
