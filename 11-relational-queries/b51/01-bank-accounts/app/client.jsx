"use client";

import { toggleActive } from "@/app/actions";

export default function Client({ client }) {
  return (
    <li className="flex gap-2" key={client.id}>
      {client.email}
      <form action={toggleActive}>
        <input name="id" type="text" value={client.id} hidden readOnly />
        <input
          name="active"
          type="text"
          value={client.active}
          hidden
          readOnly
        />
        <button className="text-sm rounded border px-2 cursor-pointer">
          {client.active ? "Active" : "Inactive"}
        </button>
      </form>
    </li>
  );
}
