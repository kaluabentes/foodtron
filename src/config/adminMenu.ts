import RouteItem from "@/types/RouteItem"
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
  BiPurchaseTag,
  BiCheckCircle,
  BiCog,
} from "react-icons/bi"

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
    icon: BiCheckCircle,
    label: "Opções",
    path: "/admin/options",
  },
  {
    icon: BiPurchaseTag,
    label: "Categorias",
    path: "/admin/categories",
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
    icon: BiCog,
    label: "Configurações",
    path: "/admin/settings",
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
