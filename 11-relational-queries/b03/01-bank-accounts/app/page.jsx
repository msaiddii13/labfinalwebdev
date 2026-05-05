import * as clients from "@/repos/clients";
import CreateClient from "@/app/create-client";

export default async function Home() {
  const data = await clients.read();

  return (
    <>
      <ul className="border rounded p-2 m-4 flex flex-wrap gap-2">
        {data.map((client) => (
          <li className="border rounded-md p-2" key={client.id}>
            <code>{client.email}</code>
          </li>
        ))}
      </ul>
      <CreateClient />
    </>
  );
}
