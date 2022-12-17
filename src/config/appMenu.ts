import { signOut } from "next-auth/react"
import { IconType } from "react-icons"
import {
  BiHelpCircle,
  BiCog,
  BiUser,
  BiMoney,
  BiCollection,
  BiGridAlt,
  BiExit,
  BiMap,
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
  {
    icon: BiUser,
    label: "Perfil",
    path: "/app/profile",
  },
]

export const bottomMenu: RouteItem[] = [
  {
    icon: BiHelpCircle,
    label: "Ajuda",
    path: "/app/help",
  },
  {
    icon: BiCog,
    label: "Configurações",
    path: "/app/help",
  },
  {
    icon: BiExit,
    label: "Sair",
    path: "/app/logout",
    onClick: () => signOut(),
  },
]
