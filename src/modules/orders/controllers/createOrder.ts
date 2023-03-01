import prisma from "@/lib/infra/prisma/client"
import createDecimal from "@/lib/infra/prisma/createDecimal"
import Order from "../types/Order"

export const ORDER_STATUS = {
  PENDING: "pending",
}

const createOrder = (order: Order) => {
  if (!order.storeId) {
    throw new Error("storeId is missing")
  }

  if (!Array.isArray(order.orderProducts) || order.orderProducts.length === 0) {
    throw new Error("add at least one product")
  }

  return prisma.order.create({
    data: {
      tax: createDecimal(order.tax),
      paymentMethod: order.paymentMethod,
      change: order.change ? createDecimal(order.change) : null,
      address: order.address,
      status: ORDER_STATUS.PENDING,
      username: order.username,
      phone: order.phone,
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
              price: createDecimal(option.price),
            })),
          },
        })),
      },
    },
    include: {
      orderProducts: {
        include: {
          options: true,
        },
      },
    },
  })
}

export default createOrder
