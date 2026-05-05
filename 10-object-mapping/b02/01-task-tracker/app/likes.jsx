"use client";

import Link from "next/link";

export default function Likes({ user }) {
  return (
    <Link href={`?action=like&id=${user.id}`}>
      <button
        onClick={(e) => {
          console.log(user);
        }}
        type="button"
        className="rounded border cursor-pointer"
      >
        Likes {user.likes}
      </button>
    </Link>
  );
}
