import { signOut } from "next-auth/react"
import { IconType } from "react-icons"
import {
  BiHelpCircle,
  BiCog,
  BiUser,
  BiMoney,
  BiCollection,
  BiGridAlt,
  BiLogOut,
  BiMap,
  BiHomeHeart,
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
    icon: BiMoney,
    label: "Caixa",
    path: "/admin/cashier",
  },
  {
    icon: BiGridAlt,
    label: "Produtos",
    path: "/admin/products",
  },
  {
    icon: BiMap,
    label: "Bairros",
    path: "/admin/districts",
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
