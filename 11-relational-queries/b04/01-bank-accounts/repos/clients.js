import prisma from "@/repos/prisma";

// console.log(await prisma.client.findMany()); // []
// console.log(await prisma.client.findUnique({ where: { id: "" } })); // null

export async function read(id) {
  if (id) {
    return await prisma.client.findUnique({ where: { id } });
  }
  return await prisma.client.findMany({});
}

export async function create(data) {
  await prisma.client.create({ data });
}
