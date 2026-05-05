"use client";

import { useState, useEffect } from "react";

export default function Clicker() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("render");
    // return () => {}; // cleanup
  });

  useEffect(() => {
    console.log("mount");
    setValue(Number(localStorage.getItem("value") ?? 0));
    // return () => {}; // cleanup
  }, []);

  useEffect(() => {
    console.log("update");
    localStorage.setItem("value", value);
    // return () => {}; // cleanup
  }, [value]);

  function increaseValue() {
    setValue(value + 1);
    // newValue = f(oldValue)
    // x = f(x)
    console.log("click");
  }

  return (
    <button
      className="border rounded text-red-500 cursor-pointer px-2"
      onClick={increaseValue}
    >
      {value}
    </button>
  );
}
