import * as clients from "@/repos/clients";
import CreateClient from "@/app/create-client";
import Component from "@/app/component";

export default async function Home() {
  const data = await clients.read();

  return (
    <>
      <ul className="p-4 border rounded-md m-4 flex flex-wrap gap-2">
        {data.map((client) => (
          <li className="text-sm p-2 border rounded-lg" key={client.id}>
            <code>{client.email}</code>
          </li>
        ))}
      </ul>
      <CreateClient />
      <Component />
    </>
  );
}
