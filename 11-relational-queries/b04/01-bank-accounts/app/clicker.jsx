"use client";

import { useState } from "react";

export default function Clicker({ initialValue }) {
  const [value, setValue] = useState(initialValue ?? 0);

  function increaseValue() {
    setValue(value + 1);
  }

  return (
    <button className="btn" onClick={increaseValue}>
      {value}
    </button>
  );
}
