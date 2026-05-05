import * as tasks from "@/repos/tasks";
import Likes from "./likes";

export default async function Page({ params, searchParams }) {
  const { action, task } = await searchParams;
  if (action === "like") {
    await tasks.like(task);
  }

  const data = await tasks.read();

  return data.map((task) => (
    <div key={task.id}>
      <ul>
        <li>Title: {task.title}</li>
        <li>Completed: {task.completed ? "Yes" : "No"}</li>
        <li>Created: {task.date.toDateString()}</li>
        <Likes task={task} />
      </ul>
    </div>
  ));
}
