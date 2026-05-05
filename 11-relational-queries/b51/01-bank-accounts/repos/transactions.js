import prisma from "@/repos/prisma";

const include = {
  transactionAccount: {
    include: {
      accountClient: true,
    },
  },
};

export async function read(id) {
  if (id) {
    return await prisma.transaction.findUnique({
      where: {
        id,
      },
      include,
    });
  }

  return await prisma.transaction.findMany({
    include,
  });
}

export async function create(data) {
  return await prisma.transaction.create({
    data: {
      type: data?.type,
      amount: data?.amount,
      date: data?.date,
      account: data?.account,
    },
    include,
  });
}

export async function update(id, data) {
  return await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      ...(data?.type !== undefined && { type: data.type }),
      ...(data?.amount !== undefined && { amount: data.amount }),
      ...(data?.date !== undefined && { date: data.date }),
      ...(data?.account !== undefined && { account: data.account }),
    },
    include,
  });
}

export async function remove(id) {
  return await prisma.transaction.delete({
    where: {
      id,
    },
    include,
  });
}
