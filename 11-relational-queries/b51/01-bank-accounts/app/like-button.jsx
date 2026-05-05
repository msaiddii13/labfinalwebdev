"use client";

import { useState, useEffect } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    console.log("i'm rendered!");
    // return () => {};
  });

  useEffect(() => {
    console.log("i'm up!");

    async function readLikes() {
      const res = await fetch("/api/likes");
      return await res.json();
    }

    readLikes().then((data) => setLikes(data.likes));
    // return () => {};
  }, []);

  useEffect(() => {
    console.log("likes are changed");

    async function writeLikes() {
      const res = await fetch("/api/likes", {
        method: "post",
        body: JSON.stringify({ likes }),
      });
      await res.json();
    }

    writeLikes().then();

    // return () => {};
  }, [likes]);

  function increaseLikes() {
    setLikes(likes + 1);
  }

  return (
    <button
      className="border rounded px-2 cursor-pointer"
      onClick={increaseLikes}
    >
      {likes}
    </button>
  );
}
