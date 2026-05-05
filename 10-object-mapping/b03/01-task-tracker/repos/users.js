// import { PrismaLibSql } from "@prisma/adapter-libsql";
// import { PrismaClient } from "@/prisma/client/client";

// const prisma = new PrismaClient({
//   adapter: new PrismaLibSql({
//     url: process.env.DATABASE_URL ?? "",
//   }),
//   log: ["query"],
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

export async function read(id) {
  if (id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  return await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
}

export async function create(data) {
  return await prisma.user.create({ data });
}

export async function karma(id) {
  return await prisma.user.update({
    where: { id },
    data: {
      karma: {
        increment: 1,
      },
    },
  });
}
