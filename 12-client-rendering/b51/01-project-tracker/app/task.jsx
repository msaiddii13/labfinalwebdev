"use client";

import { toggleTask, getHours, updateHours } from "@/app/actions";
import { use, useState, useEffect } from "react";
import { Circle, CircleCheck } from "lucide-react";

export default function Task({ task, promise }) {
  const taskData = use(promise);
  const [hours, setHours] = useState(0);
  // const [hours, setHours] = useState(
  // Number(localStorage.getItem(`hours-${task.id}`) ?? 0),
  // );

  useEffect(() => {
    console.log("render");
  });

  useEffect(() => {
    async function get() {
      // const res = await fetch(`/api/tasks${task.id}`);
      // const data = await res.json();
      // setHours(data.hours);

      const hs = await getHours(task.id);
      console.log(hs);
      setHours(hs);
    }

    if (localStorage.getItem(`hours-${task.id}`)) {
      setHours(Number(localStorage.getItem(`hours-${task.id}`) ?? "0"));
    } else {
      get().then();
    }

    console.log("mount");
    console.log(taskData);
  }, []);

  useEffect(() => {
    async function set() {
      await updateHours(task.id, hours);
    }

    if (hours) {
      set().then();
      localStorage.setItem(`hours-${task.id}`, hours);
    }

    console.log("change");
  }, [hours]);

  return (
    <li className="flex justify-between" key={task.id}>
      {task.title}
      <div className="flex gap-1">
        <form action={toggleTask}>
          <input type="text" value={task.id} name="task" readOnly hidden />
          <button className="btn btn-xs btn-circle">
            {task.completed ? (
              <CircleCheck className="inline" size={18} />
            ) : (
              <Circle className="inline" size={18} />
            )}
          </button>
        </form>
        <button
          className="btn btn-xs btn-circle"
          onClick={() => setHours(hours + 1)}
        >
          {hours}
        </button>
      </div>
    </li>
  );
}
