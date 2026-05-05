"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTask(formData) {
  try {
    const id = formData.get("id");

    const completed = (await prisma.task.findUnique({ where: { id } }))
      .completed;
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed: !completed,
      },
    });

    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}

export async function deleteTask(formData) {
  try {
    const id = formData.get("id");

    await prisma.task.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}
