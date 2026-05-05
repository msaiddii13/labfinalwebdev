import { nanoid } from "nanoid";
export async function get(id) {
  const tasks = await Bun.file("repos/data/tasks.json").json();
  if (id) {
    return tasks.find((t) => t.id === id);
  }
  return tasks;
}

export async function add(data) {
  if (!data) {
    throw new Error("No data provided");
  }

  const tasks = await Bun.file("repos/data/tasks.json").json();
  const task = {
    id: nanoid(10),
    title: data.title ?? "untitled",
    completed: data.completed ?? false,
  };
  tasks.push(task);
  await Bun.write("repos/data/tasks.json", JSON.stringify(tasks));
  return task;
}
