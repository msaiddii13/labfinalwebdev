import prisma from "@/repos/prisma";

export async function read(id) {
  if (id) {
    return await prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
  return await prisma.task.findMany({});
}

export async function create(data) {
  return await prisma.task.create({ data });
}

export async function like(id) {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      likes: { increment: 1 },
    },
  });
}
