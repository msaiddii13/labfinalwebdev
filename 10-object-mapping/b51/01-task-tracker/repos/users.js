import prisma from "@/repos/prisma";

export async function read() {
  return await prisma.user.findMany({
    include: {
      // id: false,
      // name: false,
      posts: true,
    },
  });
}

export async function create(data) {
  return await prisma.user.create({ data });
}
