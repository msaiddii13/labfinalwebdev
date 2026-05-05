"use server";

import * as clients from "@/repos/clients";
import { revalidatePath } from "next/cache";

let value = 0;

export async function handleSubmit(formData) {
  // console.log(formData);
  // formData.get("first-name")
  // const data = Object.fromEntries(formData.entries()))
  const data = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email-address"),
  };

  try {
    await clients.create(data);
    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }

  // return 0;
}

export async function createRandom() {
  try {
    await clients.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@doe" + Math.random() + ".com",
    });
    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }

  // return 0;
}

export async function dummy() {
  return value;
}

export async function updateDummy(data) {
  value = data;
  // return value;
}
