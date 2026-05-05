"use client";

// import { toggleCompleted } from "./actions";
import { Circle, CircleCheck, CircleX, Loader2 } from "lucide-react";

import { useState, useEffect, use } from "react";

export default function Task({ task: _task, promise, callback }) {
  // const task = use(promise);

  const [task, setTask] = useState(null);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    // return () => {};
  });

  useEffect(() => {
    async function get() {
      const res = await fetch(`/api/tasks/${_task.id}`);
      const data = await res.json();
      setTask(data);
    }

    if (stale) {
      get().then();
      setStale(false);
    }

    // return () => {};
  }, [stale]);

  useEffect(() => {
    // return () => {};
  }, [task]);

  async function toggleCompleted(e) {
    e.preventDefault();

    if ("completed" in task) {
      const res = await fetch(`/api/tasks/${_task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await res.json();
      setTask(data);
      // setStale(true);

      // await callback();
    }
  }

  async function deleteTask(e) {
    e.preventDefault();

    const res = await fetch(`/api/tasks/${_task.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setTask(data);
    // setStale(true);
    await callback();
  }

  if (task) {
    return (
      <li className="flex justify-between">
        <span>{task.title}</span>
        {/* <form action={toggleCompleted} onSubmit={() => setStale(true)}> */}
        <form onSubmit={toggleCompleted} className="flex justify-between">
          <input
            name="id"
            type="text"
            className="input"
            hidden
            readOnly
            value={task.id}
          />
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            hidden
            readOnly
          />
          <div>
            <button
              className="btn btn-circle btn-xs"
              onClick={() => {
                console.log("click");
              }}
            >
              {task.completed ? (
                <CircleCheck size={18} />
              ) : (
                <Circle size={18} />
              )}
            </button>
            <button
              className="btn btn-circle btn-xs"
              disabled={!task.completed}
              onClick={deleteTask}
            >
              <CircleX size={18} />
            </button>
          </div>
        </form>
      </li>
    );
  }

  return <Loader2 size={18} className="animate-spin" />;
}
