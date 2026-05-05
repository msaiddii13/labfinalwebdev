"use client";

// import * as clients from "@/repos/clients";
// import { revalidatePath } from "next/cache";

import { createClient, undoWhatever } from "@/app/actions";
import Clicker from "@/app/clicker";

export default function CreateClient() {
  /*
  async function createClient(formData) {
    "use server";

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

  async function undoWhatever(formData) {
    "use server";
    console.log(formData);
    // return 0;
  }
  */

  return (
    <form
      className="text-sm flex flex-col flex-wrap gap-2 p-4"
      action={createClient}
    >
      <input
        className="px-2 border rounded"
        type="text"
        name="first-name"
        placeholder="First"
      />
      <input
        className="px-2 border rounded"
        type="text"
        name="last-name"
        placeholder="Last"
      />
      <input
        className="px-2 border rounded"
        type="email"
        name="email-address"
        placeholder="Email"
      />
      <div className="flex gap-2 justify-center">
        <button className="border rounded px-2 cursor-pointer" type="submit">
          Create
        </button>
        <button
          className="border rounded px-2 cursor-pointer"
          formAction={undoWhatever}
        >
          Undo
        </button>
        <Clicker />
      </div>
    </form>
  );
}
