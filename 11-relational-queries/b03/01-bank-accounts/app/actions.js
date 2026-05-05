"use server";

import * as clients from "@/repos/clients";
import { revalidatePath } from "next/cache";

export async function createClient(formData) {
  try {
    // formData.get("first-name");
    // const data = Object.fromEntries(formData.entries());

    await clients.create({
      // firstName: data["first-name"],
      // lastName: data["last-name"],
      // email: data["email-address"],
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email-address"),
    });
    revalidatePath("/");
    // console.log(data);

    // return 0;
  } catch (e) {
    console.error(e.message);
  }
}

export async function undoWhatever(formData) {
  console.log(formData);
  // return 0;
}
