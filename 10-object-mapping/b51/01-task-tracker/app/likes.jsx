"use client";

import Link from "next/link";

export default function Likes({ task }) {
  const handleLike = (e) => {
    console.log(e);
    console.log(task.likes);
  };

  return (
    <li>
      Likes:
      <Link href={`?action=like&task=${task.id}`}>
        <button>{task.likes}</button>
      </Link>
      <button onClick={handleLike}>{task.likes}</button>
    </li>
  );
}
