import prisma from "@/repos/prisma";

const include = {
  accountClient: true,
  transactions: true,
};

export async function read(id) {
  if (id) {
    return await prisma.account.findUnique({
      where: {
        id,
      },
      include,
    });
  }

  return await prisma.account.findMany({
    include,
  });
}

export async function create(data) {
  return await prisma.account.create({
    data: {
      type: data?.type,
      balance: data?.balance,
      client: data?.client,
    },
    include,
  });
}

export async function update(id, data) {
  return await prisma.account.update({
    where: {
      id,
    },
    data: {
      ...(data?.type !== undefined && { type: data.type }),
      ...(data?.balance !== undefined && { balance: data.balance }),
      ...(data?.client !== undefined && { client: data.client }),
    },
    include,
  });
}

export async function remove(id) {
  return await prisma.account.delete({
    where: {
      id,
    },
    include,
  });
}
