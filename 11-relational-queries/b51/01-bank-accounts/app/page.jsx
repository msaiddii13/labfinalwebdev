import * as clients from "@/repos/clients";
// import { faker } from "@faker-js/faker";
import Clients from "@/app/clients";
// import { revalidatePath } from "next/cache";
import LikeButton from "@/app/like-button";

export default async function Home() {
  const data = await clients.read();

  // async function addClient(formData) {
  //   // POST on /clients
  //   "use server";

  //   try {
  //     await clients.create({
  //       firstName: formData.get("first-name"),
  //       lastName: formData.get("last-name"),
  //       email: formData.get("email"),
  //       // firstName: faker.person.firstName(),
  //       // lastName: faker.person.lastName(),
  //       // email: faker.internet.email(),
  //     });
  //     revalidatePath("/");
  //   } catch (e) {}
  // }

  return (
    <>
      <Clients clients={data} />
      <LikeButton />
      <LikeButton />
      <LikeButton />
      <LikeButton />
      <LikeButton />
    </>
  );
}
