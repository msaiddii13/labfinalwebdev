"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTask(formData) {
  // const id = formData.get("id");
  // const task = await prisma.task.findUnique({
  //   where: { id },
  // });
  // await prisma.task.update({
  //   where: { id },
  //   data: {
  //     completed: !task.completed,
  //   },
  // });

  try {
    await prisma.task.update({
      where: { id: formData.get("id") },
      data: {
        completed: formData.get("completed") === "1" ? false : true,
      },
    });
    revalidatePath("/");
    // return whatever;
  } catch (e) {
    console.error(e.message);
  }
}
