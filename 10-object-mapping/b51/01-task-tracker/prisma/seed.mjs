import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/prisma/client/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "",
  }),
  log: ["query"],
});

const seed = async () => {
  Array.from({ length: Math.floor(Math.random() * 60) }).forEach(
    async () =>
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          posts: {
            create: Array.from({
              length: Math.floor(Math.random() * 12),
            }).map(() => ({
              title: faker.commerce.productName(),
              content: faker.lorem.text(),
              published: Math.random() > 0.5,
            })),
          },
        },
      }),
  );
};

const seed2 = async () => {
  Array.from({ length: Math.floor(Math.random() * 60) }).forEach(
    async () =>
      await prisma.task.create({
        data: {
          title: faker.book.title(),
        },
      }),
  );
};

try {
  // await seed();
  await seed2();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
