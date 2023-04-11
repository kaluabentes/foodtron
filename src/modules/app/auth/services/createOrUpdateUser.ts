import prisma from "@/lib/providers/prisma/client"
import Address from "@/modules/app/addresses/types/Address"
import Order from "@/modules/admin/orders/types/Order"

const createOrUpdateUser = async (body: any) => {
  const store = await prisma.store.findFirst({
    where: {
      subdomain: body.subdomain,
    },
  })

  const include = {
    orders: {
      include: {
        user: true,
        orderProducts: {
          include: {
            options: true,
          },
        },
      },
    },
    addresses: {
      include: {
        location: true,
      },
    },
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      storeId: store?.id,
      phone: body.phone,
    },
    include,
  })

  if (existingUser) {
    const user = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        selectedAddressId: body.selectedAddressId,
        orders: {
          connect: body.orders.map((order: Order) => ({
            id: order.id,
          })),
        },
        addresses: {
          create: body.addresses.map((address: Address) => ({
            street: address.street,
            number: address.number,
            latitude: address.latitude,
            longitude: address.longitude,
            location: {
              connect: {
                id: address.location.id,
              },
            },
          })),
        },
      },
      include,
    })

    return user
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      phone: body.phone,
      selectedAddressId: body.selectedAddressId,
      store: {
        connect: {
          id: store?.id,
        },
      },
      orders: {
        connect: body.orders.map((order: Order) => ({
          id: order.id,
        })),
      },
      addresses: {
        create: body.addresses.map((address: Address) => ({
          street: address.street,
          number: address.number,
          latitude: address.latitude,
          longitude: address.longitude,
          location: {
            connect: {
              id: address.location.id,
            },
          },
        })),
      },
    },
    include,
  })

  return user
}

export default createOrUpdateUser
