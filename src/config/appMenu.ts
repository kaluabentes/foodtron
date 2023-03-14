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
  BiDish,
  BiTask,
  BiCart,
} from "react-icons/bi"
import { FaWhatsapp } from "react-icons/fa"

export const topMenu: RouteItem[] = [
  {
    icon: BiDish,
    label: "Menu",
    path: "/",
  },
  {
    icon: BiCart,
    label: "Carrinho",
    path: "/order-confirm",
  },
  {
    icon: BiTask,
    label: "Pedidos",
    path: "/orders",
  },
  {
    icon: BiMap,
    label: "Endereços",
    path: "/addresses",
  },
  {
    icon: BiUser,
    label: "Perfil",
    path: "/profile",
  },
]

export const bottomMenu: RouteItem[] = []
