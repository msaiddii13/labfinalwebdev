// import { PrismaLibSql } from "@prisma/adapter-libsql";
// import { PrismaClient } from "@/prisma/client/client";

// const prisma = new PrismaClient({
//   adapter: new PrismaLibSql({
//     url: process.env.DATABASE_URL ?? "",
//   }),
// });

// async function disconnect() {
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }

import prisma from "@/repos/prisma";

export async function read() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      // id: false,
    },
  });

  // await disconnect();
  return users;
}

export async function create(data) {
  return await prisma.user.create({ data });
}

export async function like(id) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}
