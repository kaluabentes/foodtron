export const ORDER_STATUS = {
  PENDING: "pending",
  DOING: "doing",
  DELIVERY: "delivery",
  DONE: "done",
  CANCELLED: "cancelled",
}

export const ORDER_STATUS_COLOR_SCHEME = {
  [ORDER_STATUS.PENDING]: "brand",
  [ORDER_STATUS.DOING]: "brand",
  [ORDER_STATUS.DELIVERY]: "red",
  [ORDER_STATUS.DONE]: "green",
  [ORDER_STATUS.CANCELLED]: "gray",
}

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING]: "Aguardando",
  [ORDER_STATUS.DOING]: "Fazendo",
  [ORDER_STATUS.DELIVERY]: "Em trânsito",
  [ORDER_STATUS.DONE]: "Entregue",
  [ORDER_STATUS.CANCELLED]: "Cancelado",
}
