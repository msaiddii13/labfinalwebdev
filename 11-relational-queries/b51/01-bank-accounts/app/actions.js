"use server";

import prisma from "@/repos/prisma";
import { revalidatePath } from "next/cache";

export async function addClient(formData) {
  // POST on /clients

  try {
    await prisma.client.create({
      data: {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        // firstName: faker.person.firstName(),
        // lastName: faker.person.lastName(),
        // email: faker.internet.email(),
      },
    });
    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}

export async function toggleActive(formData) {
  const id = formData.get("id");
  const active = formData.get("active") === "true";

  console.log(id, active);

  try {
    await prisma.client.update({
      where: {
        id,
      },
      data: {
        active: !active,
      },
    });

    console.log(
      await prisma.client.findUnique({
        where: { id },
      }),
    );

    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}
