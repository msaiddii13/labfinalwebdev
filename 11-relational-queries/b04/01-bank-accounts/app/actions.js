"use server";

import * as clients from "@/repos/clients";
import { revalidatePath } from "next/cache";

export async function createClient(formData) {
  try {
    // console.log(formData);
    // console.log(Object.fromEntries(formData.entries()));
    // formData.get("first-name")

    await clients.create({
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email-address"),
    });

    revalidatePath("/");

    // console.log("called");
  } catch (e) {
    console.error(e);
  }
}

export async function whatever(formData) {
  try {
    // console.log(formData);
    // console.log(Object.fromEntries(formData.entries()));
    // formData.get("first-name")

    await clients.create({
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: "1" + Math.random() + "@.com",
    });

    revalidatePath("/");

    // console.log("called");
  } catch (e) {
    console.error(e);
  }
}

// export async function value() {}
