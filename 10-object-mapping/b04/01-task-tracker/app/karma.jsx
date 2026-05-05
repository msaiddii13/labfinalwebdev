"use client";

import Link from "next/link";

export default function Karma({ user, rand }) {
  return (
    // <Link href={`?action=karma&user=${user.id}`}>
    <>
      <button
        onClick={async () => {
          const res = await fetch(`api/users/${user.id}/karma`);
          console.log(user);
        }}
        className="rounded border cursor-pointer px-2"
      >
        {user.karma}
      </button>
      {rand}
      {/* {Math.random()} */}
    </>
    // </Link>
  );
}
