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
    path: "/app/orders",
  },
  {
    icon: BiMoney,
    label: "Caixa",
    path: "/app/cashier",
  },
  {
    icon: BiGridAlt,
    label: "Produtos",
    path: "/app/products",
  },
  {
    icon: BiMap,
    label: "Bairros",
    path: "/app/districts",
  },
]

export const bottomMenu: RouteItem[] = [
  {
    icon: BiHomeHeart,
    label: "Loja",
    path: "/app/store",
  },
  {
    icon: BiUser,
    label: "Perfil",
    path: "/app/profile",
  },
  {
    icon: BiLogOut,
    label: "Sair",
    path: "/app/logout",
    onClick: () => signOut({ callbackUrl: "/signin" }),
  },
]
