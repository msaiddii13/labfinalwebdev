"use client";

import Link from "next/link";

export default function Karma({ user, value }) {
  return (
    // <Link href={`?action=karma&user=${user.id}`}>
    <>
      <button
        onClick={async (e) => {
          console.log(user);
          // await fetch(`/api/users/${user.id}`, {
          //   method: "PATCH",
          //   body: JSON.stringify({ karma: user.karma + 1 }),
          // });
          await fetch(`?action=karma&user=${user.id}`);
        }}
        className="button rounded border px-1 cursor-pointer"
      >
        Karma: {user.karma ?? 0}
      </button>
      <span>{value}</span>
    </>
    // </Link>
  );
}
