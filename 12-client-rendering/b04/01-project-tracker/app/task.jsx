"use client";

import { useState, useEffect, use } from "react";
import { toggleTask } from "@/app/actions.js";
import { Circle, CircleCheck, Loader2 } from "lucide-react";

export default function Task({ task, promise }) {
  const data = use(promise);
  // const [data, setData] = useState(null);
  const [stale, setStale] = useState(true);

  // useEffect(() => {})

  useEffect(() => {
    async function getSet() {
      const res = await fetch(`/api/tasks/${task.id}`);
      const result = await res.json();
      setData(result);
    }

    if (stale) {
      getSet();
      setStale(false);
    }
  }, [stale]);

  function handleToggle(e) {
    e.preventDefault();

    async function patch() {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !data.completed }),
      });
      const result = await res.json();
      setData(result);
      // setStale(true);
    }

    if (data) {
      patch();
    }
  }

  // useEffect(() => {}, [task])

  if (data) {
    return (
      <li className="flex justify-between">
        <span>{data.title}</span>
        <form
          // action={toggleTask}
          onClick={handleToggle}
        >
          <input
            name="id"
            type="text"
            value={data.id}
            className="input"
            hidden
            readOnly
          />
          <input
            name="completed"
            type="input"
            value={data.completed ? "1" : "0"}
            hidden
            readOnly
          />
          <button className="btn btn-xs btn-circle">
            {data.completed ? <CircleCheck size={18} /> : <Circle size={18} />}
          </button>
        </form>
      </li>
    );
  }
  return <Loader2 size={18} className="animate-spin" />;
}
