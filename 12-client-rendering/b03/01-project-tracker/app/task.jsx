"use client";

import { useState, useEffect, use } from "react";
import { Circle, CircleCheck, CircleX, Loader2 } from "lucide-react";
import { toggleTask, deleteTask } from "@/app/actions";
// import { revalidatePath } from "next/cache";

export default function Task({ task, callback, promise }) {
  // const taskA = use(promise);
  const [taskA, setTaskA] = useState(null);
  const [stale, setStale] = useState(true);

  // useEffect(() => {});

  useEffect(() => {
    async function get() {
      const res = await fetch(`/api/tasks/${task.id}`);
      const data = await res.json();
      setTaskA(data);
      setStale(false);
    }

    if (stale) {
      get().then();
    }
  }, [stale]);

  // useEffect(() => {}, [taskA]);

  async function handleDelete(e) {
    e.preventDefault();
    const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    const data = await res.json();
    await callback();
    // revalidatePath("/");
  }

  if (taskA) {
    return (
      <li className="flex justify-between">
        <span>{taskA.title}</span>
        <div className="flex gap-0.5">
          <form action={toggleTask} onSubmit={() => setStale(true)}>
            <input type="text" value={taskA.id} name="id" hidden readOnly />
            <button
              onClick={() => console.log("toggle")}
              className="btn btn-xs btn-circle"
            >
              {taskA.completed ? (
                <CircleCheck size={18} />
              ) : (
                <Circle size={18} />
              )}
            </button>
          </form>
          {/* <form action={deleteTask}> */}
          <form onSubmit={handleDelete}>
            <input type="text" value={taskA.id} name="id" hidden readOnly />
            <button
              onClick={() => console.log("delete")}
              className="btn btn-xs btn-circle"
              disabled={!taskA.completed}
            >
              <CircleX size={18} />
            </button>
          </form>
        </div>
      </li>
    );
  }
  return <Loader2 size={18} className="animate-spin" />;
}
