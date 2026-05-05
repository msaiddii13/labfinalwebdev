"use client";

import { createClient, whatever } from "@/app/actions";

export default function CreateClient() {
  return (
    <form className="p-2 flex flex-col gap-2" action={createClient}>
      <input
        name="first-name"
        className="input"
        type="text"
        placeholder="First"
      />
      <input
        name="last-name"
        className="input"
        type="text"
        placeholder="Last"
      />
      <input
        name="email-address"
        className="input"
        type="email"
        placeholder="Email"
      />
      <button className="btn" type="submit">
        Create
      </button>
      <button
        onClick={() => {
          alert("yo!");
        }}
        className="btn"
        formAction={whatever}
      >
        Random
      </button>
    </form>
  );
}
