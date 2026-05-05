"use client";

// import * as clients from "@/repos/clients";
// import { revalidatePath } from "next/cache";
import { handleSubmit } from "@/app/actions.js";
import { createRandom } from "@/app/actions.js";

export default function CreateClient() {
  // console.log("rendered");
  // async function handleSubmit(formData) {
  //   "use server";

  //   // console.log(formData);
  //   // formData.get("first-name")
  //   // const data = Object.fromEntries(formData.entries()))
  //   const data = {
  //     firstName: formData.get("first-name"),
  //     lastName: formData.get("last-name"),
  //     email: formData.get("email-address"),
  //   };

  //   try {
  //     await clients.create(data);
  //     revalidatePath("/");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <form className="flex flex-col gap-2" action={handleSubmit}>
      <input
        className="border rounded px-2"
        type="text"
        name="first-name"
        placeholder="First"
      />
      <input
        className="border rounded px-2"
        type="text"
        name="last-name"
        placeholder="Last"
      />
      <input
        className="border rounded px-2"
        type="email"
        name="email-address"
        placeholder="Email"
      />
      <button className="border rounded px-2 cursor-pointer" type="submit">
        Create
      </button>
      <button formAction={createRandom}>Create random</button>
    </form>
  );
}
