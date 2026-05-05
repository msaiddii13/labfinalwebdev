import { nanoid } from "nanoid";
export async function get(id) {
  const tasks = await Bun.file("repos/data/tasks.json").json();
  if (id) {
    return tasks.find((task) => task.id === id);
  }
  return tasks;
}

export async function add(data) {
  if (data?.title === undefined) {
    throw new Error("Title is required");
  }

  const tasks = await Bun.file("repos/data/tasks.json").json();
  const task = {
    id: nanoid(10),
    title: data.title,
    completed: data?.completed ?? false,
  };
  tasks.push(task);
  await Bun.write("repos/data/tasks.json", JSON.stringify(tasks));
  return task;
}

export async function set(id, data) {}

export async function remove(id) {}
