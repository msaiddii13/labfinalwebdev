"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function toggleCompleted(formData) {
  const task = await prisma.task.findUnique({
    where: {
      id: formData.get("id"),
    },
  });
  await prisma.task.update({
    where: {
      id: formData.get("id"),
    },
    data: {
      // completed: !formData.get("completed"),
      completed: !task.completed,
    },
  });
  revalidatePath("/");
}

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      tasks: true,
    },
  });
}
