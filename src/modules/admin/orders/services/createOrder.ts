import formatPhone from "@/lib/helpers/string/formatPhone"
import prisma from "@/lib/infra/prisma/client"
import createDecimal from "@/lib/infra/prisma/createDecimal"
import { ORDER_STATUS } from "../constants"
import Order from "../types/Order"

const createOrder = (order: Order) => {
  if (!order.storeId) {
    throw new Error("storeId is missing")
  }

  if (!Array.isArray(order.orderProducts) || order.orderProducts.length === 0) {
    throw new Error("add at least one product")
  }

  const data = {
    tax: createDecimal(order.tax),
    paymentMethod: order.paymentMethod,
    change: order.change ? createDecimal(order.change) : null,
    address: order.address,
    status: ORDER_STATUS.PENDING,
    username: order.username,
    phone: formatPhone(order.phone),
    estimatedTime: order.estimatedTime,
    user: order.userId
      ? {
          connect: {
            id: order.userId,
          },
        }
      : undefined,
    store: {
      connect: {
        id: order.storeId,
      },
    },
    orderProducts: {
      create: order.orderProducts.map((orderProduct) => ({
        title: orderProduct.title,
        price: createDecimal(orderProduct.price),
        quantity: String(orderProduct.quantity),
        image: orderProduct.image,
        observation: orderProduct.observation,
        options: {
          create: orderProduct.options?.map((option) => ({
            title: option.title,
            quantity: option.quantity,
            price: option.price ? createDecimal(option.price) : null,
          })),
        },
      })),
      orderStatuses: {
        create: [{ status: order.status }],
      },
    },
  }

  return prisma.order.create({
    data,
    include: {
      store: true,
      user: true,
      orderProducts: {
        include: {
          options: true,
        },
      },
    },
  })
}

export default createOrder
