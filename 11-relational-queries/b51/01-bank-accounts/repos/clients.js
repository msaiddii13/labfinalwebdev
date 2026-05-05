import prisma from "@/repos/prisma";

const include = {
  accounts: {
    include: {
      transactions: true,
    },
  },
};

export async function read(id) {
  if (id) {
    return await prisma.client.findUnique({
      where: {
        id,
      },
      include,
    });
  }

  return await prisma.client.findMany({
    include,
  });
}

export async function create(data) {
  return await prisma.client.create({
    data: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
    include,
  });
}

export async function update(id, data) {
  return await prisma.client.update({
    where: {
      id,
    },
    data: {
      ...(data?.firstName !== undefined && { firstName: data.firstName }),
      ...(data?.lastName !== undefined && { lastName: data.lastName }),
      ...(data?.email !== undefined && { email: data.email }),
    },
    include,
  });
}

export async function remove(id) {
  return await prisma.client.delete({
    where: {
      id,
    },
    include,
  });
}
