import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request, { params }) {
  const { task } = await params;
  return Response.json(await prisma.task.findUnique({ where: { id: task } }));
}

export async function DELETE(request, { params }) {
  const { task } = await params;
  try {
    await prisma.task.delete({
      where: {
        id: task,
      },
    });
    revalidatePath("/");
    return Response.json({ message: "Deleted" });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
