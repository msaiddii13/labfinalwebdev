import { nanoid } from "nanoid";

export async function get(id) {
  const tasks = await Bun.file("repo/data/tasks.json").json();
  if (id) {
    return tasks.find((task) => task.id === id);
  }
  return tasks;
}

export async function add(data) {
  if (!data || data.title === undefined) {
    return {
      error: "Title is required",
      status: 400,
    };
  }

  const task = {
    id: nanoid(10),
    title: data?.title ?? "untitled",
    completed: data?.completed ?? false,
  };

  const tasks = await Bun.file("repo/data/tasks.json").json();
  tasks.push(task);
  await Bun.write("repo/data/tasks.json", JSON.stringify(tasks));

  return task;
}
