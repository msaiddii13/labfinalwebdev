"use client";

import { dummy, updateDummy } from "@/app/actions";
import { useState, useEffect } from "react";

export default function Component({ initialValue = 0 }) {
  const [value, setValue] = useState(initialValue);

  // useEffect(() => {
  //   console.log("event: render");
  //   // setValue(localStorage.getItem("whatever") ?? 0);
  //   // return () => {}; // cleanup
  // });

  useEffect(() => {
    console.log("event: mount");

    async function load() {
      setValue(await dummy());
    }

    load().then();
  }, []);

  useEffect(() => {
    console.log("event: change");

    async function update() {
      await updateDummy(value);
    }

    update().then();
  }, [value]);

  // async function fetchDummy() {
  //   const { value } = await dummy();
  // }

  function increaseValue() {
    setValue(value + 1);
    // setValue((oldValue) => oldValue + 1);
  }

  // fetchDummy();

  return (
    <div className="flex gap-2">
      <span>{value}</span>
      <button
        className="border rounded px-2 cursor-pointer"
        onClick={increaseValue}
      >
        +
      </button>
    </div>
  );
}
