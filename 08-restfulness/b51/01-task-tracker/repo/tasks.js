import { nanoid } from "nanoid";

const path = "repo/data/tasks.json";

export async function add(data) {
  const tasks = await Bun.file(path).json();
  const task = {
    id: nanoid(10),
    title: data?.title ?? "untitled",
    completed: data?.completed ?? false,
  };
  tasks.push(task);
  Bun.write(path, JSON.stringify(tasks));
  return task;
} // post (create)

export async function get(id) {
  const tasks = await Bun.file(path).json();
  if (!id) {
    return tasks;
  }
  return tasks.find((t) => t.id === id);
}

export async function set(id, data) {
  const tasks = await Bun.file(path).json();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    if (data?.title !== "" && data?.completed) {
      const task = {
        id: nanoid(10),
        title: data?.title ?? "untitled",
        completed: data?.completed ?? false,
      };
      tasks.splice(index, 1, task);
      Bun.write(path, JSON.stringify(tasks));
      return task;
    }
    throw new Error("S100");
  } else {
    throw new Error("S101");
  }
} // put (replace), patch (update)

export async function remove(id) {
  const tasks = await Bun.file(path).json();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    const task = tasks[index];
    tasks.splice(index, 1);
    Bun.write(path, JSON.stringify(tasks));
    return task;
  } else {
    throw new Error("S101");
  }
} // delete
