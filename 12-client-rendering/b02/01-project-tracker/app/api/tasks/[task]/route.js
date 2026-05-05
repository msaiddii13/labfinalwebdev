import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  const { task } = await params;
  try {
    return Response.json(await prisma.task.findUnique({ where: { id: task } }));
  } catch (e) {
    console.error(e.message);
  }
}

export async function PATCH(request, { params }) {
  const { task } = await params;
  const data = await request.json();

  try {
    return Response.json(
      await prisma.task.update({ where: { id: task }, data }),
    );
  } catch (e) {
    console.error(e.message);
  }
}

export async function DELETE(request, { params }) {
  const { task } = await params;

  try {
    const data = await prisma.task.delete({ where: { id: task } });
    // revalidatePath("/");
    return Response.json({});
  } catch (e) {
    console.error(e.message);
  }
}
