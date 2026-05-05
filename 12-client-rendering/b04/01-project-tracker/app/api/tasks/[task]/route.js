import prisma from "@/repos/prisma";

export async function GET(request, { params }) {
  const { task } = await params;
  const result = await prisma.task.findUnique({ where: { id: task } });
  return Response.json(result);
}

export async function PATCH(request, { params }) {
  const { task } = await params;
  const data = await request.json();
  const result = await prisma.task.update({ where: { id: task }, data });
  return Response.json(result);
}
