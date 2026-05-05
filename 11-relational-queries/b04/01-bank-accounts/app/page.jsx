import * as clients from "@/repos/clients";
import CreateClient from "@/app/create-client";
import Clicker from "@/app/clicker";

export default async function Home({ params, searchParams }) {
  // const data = await fetch(`${process.env.BASE_URL}/api/clients`);
  try {
    const data = await clients.read();

    return (
      <>
        <ul className="flex border rounded p-2 m-4 gap-2 flex-wrap">
          {data.map((client) => (
            <li className="flex border rounded-md p-2" key={client.id}>
              <code>{client.email}</code>
            </li>
          ))}
        </ul>
        <Clicker />
        <Clicker initialValue={5} />
        <CreateClient />
      </>
    );
  } catch (e) {
    return "Error";
  }
}
