"use client";

import Client from "@/app/client";
import { addClient } from "@/app/actions.js";

export default function Clients({ clients }) {
  return (
    <>
      <h2>Clients</h2>
      <ul>
        {/* {clients.map((client) => (
          <li key={client.id}>{client.email}</li>
        ))} */}
        {clients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </ul>
      <form action={addClient}>
        <input type="text" name="first-name" placeholder="First name" />
        <input type="text" name="last-name" placeholder="Last name" />
        <input type="email" name="email" placeholder="name@example.com" />
        <button type="submit" className="rounded border px-2 cursor-pointer">
          New client
        </button>
        <button
          className="rounded border px-2 cursor-pointer"
          onClick={() => console.log(clients)}
        >
          Local
        </button>
      </form>
    </>
  );
}
