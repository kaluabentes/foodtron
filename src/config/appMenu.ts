import RouteItem from "@/types/RouteItem"
import {
  BiUser,
  BiMap,
  BiMoney,
  BiDish,
  BiTask,
  BiCart,
  BiInfoCircle,
} from "react-icons/bi"

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
    icon: BiMap,
    label: "Endereços",
    path: "/addresses",
  },
  {
    icon: BiUser,
    label: "Perfil",
    path: "/profile",
  },
  {
    icon: BiTask,
    label: "Pedidos",
    path: "/orders",
  },
  {
    icon: BiInfoCircle,
    label: "Informações",
    path: "/about",
  },
]

export const bottomMenu: RouteItem[] = []
