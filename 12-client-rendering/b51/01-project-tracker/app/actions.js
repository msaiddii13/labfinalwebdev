"use server";

const hours = {};

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTask(formData) {
  const task = formData.get("task");
  const state = await prisma.task.findUnique({ where: { id: task } });
  const completed = state.completed;

  try {
    await prisma.task.update({
      where: {
        id: task,
      },
      data: {
        completed: !completed,
      },
    });
    revalidatePath("/");
  } catch (e) {
    console.error(e.message);
  }
}

export async function getHours(task) {
  return hours[task] ?? 0;
}

export async function updateHours(task, hs) {
  hours[task] = hs;
}
