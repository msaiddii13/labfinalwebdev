import prisma from "@/repos/prisma";

// async function disconnect() {
//   try {
//     await prisma.$disconnect();
//   } catch (e) {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }

export async function read() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  // await disconnect();
  return users;
}

// console.log(await read());

export async function karma(id) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      karma: {
        increment: 1,
      },
    },
  });
}
