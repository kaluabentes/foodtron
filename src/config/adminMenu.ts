import RouteItem from "@/types/RouteItem"
import { signOut } from "next-auth/react"
import { IconType } from "react-icons"
import {
  BiUser,
  BiCollection,
  BiGridAlt,
  BiLogOut,
  BiMap,
  BiAlarm,
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
  {
    icon: BiCog,
    label: "Configurações",
    path: "/admin/settings",
  },
]

export const bottomMenu: RouteItem[] = [
  // {
  //   icon: BiBug,
  //   label: "Reportar bug",
  //   path: "/admin/settings",
  // },
  // {
  //   icon: BiHelpCircle,
  //   label: "Ajuda",
  //   path: "/admin/settings",
  // },
  {
    icon: BiUser,
    label: "Perfil de usuário",
    path: "/admin/profile",
  },
  {
    icon: BiLogOut,
    label: "Sair",
    onClick: () => signOut({ callbackUrl: "/auth/signin" }),
  },
]
