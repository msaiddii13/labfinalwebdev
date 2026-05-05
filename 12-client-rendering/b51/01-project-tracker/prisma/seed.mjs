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
      await prisma.project.create({
        data: {
          title: faker.book.title(),
          tasks: {
            create: Array.from({
              length: Math.floor(Math.random() * 12),
            }).map(() => ({
              title: faker.animal.petName(),
              completed: Math.random() > 0.5,
            })),
          },
        },
      }),
  );
};

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
